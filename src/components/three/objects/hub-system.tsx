"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useReducedMotion } from "@/src/hooks/use-reduced-motion";

// Coordinates for the 3 satellite nodes representing Links, Lab, and Profile
const SATELLITE_NODES: readonly [number, number, number][] = [
  [1.3, 0.4, 0.3],
  [-1.2, 0.6, -0.4],
  [-0.3, -1.1, 0.5],
];

export function HubSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const invalidate = useThree((state) => state.invalidate);
  const canvas = useThree((state) => state.gl.domElement);
  const isVisible = useRef(true);

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && isVisible.current) invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
      if (entry.isIntersecting && !document.hidden) invalidate();
    });

    observer.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [canvas, invalidate]);

  useEffect(() => {
    invalidate();
  }, [invalidate, reducedMotion]);

  // Pre-generate connection line geometry between hub core and satellite nodes
  const connectionGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const origin = new THREE.Vector3(0, 0, 0);

    SATELLITE_NODES.forEach(([x, y, z]) => {
      points.push(origin, new THREE.Vector3(x, y, z));
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  // Pre-generate edge wireframe geometry for central icosahedron
  const centralEdges = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(0.85, 0);
    return new THREE.EdgesGeometry(ico);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!isVisible.current || document.hidden) return;

    if (reducedMotion) {
      // Static, stable presentation for reduced-motion users
      groupRef.current.rotation.x = 0.2;
      groupRef.current.rotation.y = 0.4;
      return;
    }

    // Gentle continuous rotation around Y axis
    groupRef.current.rotation.y += delta * 0.2;

    // Subtle pointer parallax dampening
    const targetX = state.pointer.y * 0.15;
    const targetZ = -state.pointer.x * 0.15;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      2.5,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetZ,
      2.5,
      delta
    );

    // Demand rendering continues only while the visible scene is animated.
    state.invalidate();
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Central Core: Multifaceted hub form */}
      <mesh>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#161922"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Central Core: Wireframe edge accent */}
      <lineSegments geometry={centralEdges}>
        <lineBasicMaterial color="#8ba2c8" transparent opacity={0.65} />
      </lineSegments>

      {/* Orbital Framing Ring */}
      <mesh rotation={[Math.PI / 3.2, 0.2, 0]}>
        <torusGeometry args={[1.65, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#444c60"
          roughness={0.5}
          metalness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Interconnecting Structure Vectors */}
      <lineSegments geometry={connectionGeometry}>
        <lineBasicMaterial color="#3b4255" transparent opacity={0.55} />
      </lineSegments>

      {/* Satellite Destination Nodes (Links, Lab, Profile) */}
      {SATELLITE_NODES.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color={idx === 0 ? "#8ba2c8" : idx === 1 ? "#7e94b8" : "#9cb5dc"}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
