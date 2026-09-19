"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, MathUtils, Object3D, type BufferAttribute, type Group, type InstancedMesh } from "three";

import { useReducedMotion } from "@/src/hooks/use-reduced-motion";
import { COMPACT_NODES, WIDE_NODES, nodeInfluence } from "./field-layout";
import styles from "./spatial-node-field.module.css";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function NodeComposition({ surface }: { surface: RefObject<HTMLDivElement | null> }) {
  const reducedMotion = useReducedMotion();
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const compact = size.width < 600;
  const positions = compact ? COMPACT_NODES : WIDE_NODES;
  const core = useRef<Group>(null);
  const nodes = useRef<InstancedMesh>(null);
  const connections = useRef<BufferAttribute>(null);
  const pointer = useRef({ x: 0, y: 0, active: false, enabled: false, visible: true });
  const influences = useRef(new Float32Array(6));
  const scratch = useMemo(() => ({
    object: new Object3D(),
    color: new Color(),
    restingColor: new Color("#8d95a5"),
    nearColor: new Color("#d1d5db"),
    lines: new Float32Array(36),
    colors: new Float32Array(18).fill(1),
  }), []);

  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    const capability = window.matchMedia(FINE_POINTER);
    const input = pointer.current;
    const reset = () => {
      input.active = false;
      invalidate();
    };
    const syncCapability = () => {
      input.enabled = capability.matches && !reducedMotion;
      reset();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        if (input.active) reset();
        return;
      }
      if (!input.enabled || event.buttons !== 0) return;
      // The canvas is pointer-transparent; offset coordinates belong to this surface.
      input.x = MathUtils.clamp(event.offsetX / size.width * 2 - 1, -1, 1);
      input.y = MathUtils.clamp(1 - event.offsetY / size.height * 2, -1, 1);
      input.active = true;
      invalidate();
    };
    const press = (event: PointerEvent) => {
      if (event.pointerType === "touch") reset();
    };
    const visibility = () => {
      input.active = false;
      if (!document.hidden) invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      input.visible = entry.isIntersecting;
      input.active = false;
      if (entry.isIntersecting) invalidate();
    });
    syncCapability();
    observer.observe(element);
    capability.addEventListener("change", syncCapability);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerdown", press, { passive: true });
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    document.addEventListener("visibilitychange", visibility);

    return () => {
      observer.disconnect();
      capability.removeEventListener("change", syncCapability);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerdown", press);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      document.removeEventListener("visibilitychange", visibility);
      input.active = false;
    };
  }, [invalidate, reducedMotion, size.width, size.height, surface]);

  useFrame((state, delta) => {
    if (!nodes.current || !core.current || !connections.current) return;
    const input = pointer.current;
    if (!input.visible || document.hidden) return;
    const canMove = input.enabled && !reducedMotion;
    const active = canMove && input.active;
    const dt = Math.min(delta, 1 / 30);
    const pointerX = input.x * state.viewport.width / 2;
    const pointerY = input.y * state.viewport.height / 2;
    let settling = false;

    for (let i = 0; i < positions.length; i++) {
      const [x, y, z] = positions[i];
      const target = active ? nodeInfluence(x, y, pointerX, pointerY) : 0;
      const previous = influences.current[i];
      const next = canMove ? MathUtils.damp(previous, target, 9, dt) : 0;
      const moving = Math.abs(next - target) > 0.001;
      const influence = moving ? next : target;
      influences.current[i] = influence;
      settling ||= moving;
      const intensity = compact ? 0.65 : 1;
      const depth = z + influence * 0.35 * intensity;
      const lift = y + influence * 0.09 * intensity;
      scratch.object.position.set(x, lift, depth);
      scratch.object.rotation.set(0.15 + influence * 0.12, i * 0.4, 0.15);
      scratch.object.scale.setScalar((0.24 + (i % 3) * 0.035) * (1 + influence * 0.16));
      scratch.object.updateMatrix();
      nodes.current.setMatrixAt(i, scratch.object.matrix);
      scratch.color.copy(scratch.restingColor).lerp(scratch.nearColor, influence);
      nodes.current.setColorAt(i, scratch.color);
      connections.current.setXYZ(i * 2, 0, 0, 0);
      connections.current.setXYZ(i * 2 + 1, x, lift, depth);
    }

    const targetX = 0.2 + (active ? input.y * 0.1 : 0);
    const targetY = 0.35 + (active ? input.x * 0.12 : 0);
    const rotation = core.current.rotation;
    rotation.x = canMove ? MathUtils.damp(rotation.x, targetX, 9, dt) : 0.2;
    rotation.y = canMove ? MathUtils.damp(rotation.y, targetY, 9, dt) : 0.35;
    settling ||= Math.abs(rotation.x - targetX) + Math.abs(rotation.y - targetY) > 0.001;
    nodes.current.instanceMatrix.needsUpdate = true;
    if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true;
    connections.current.needsUpdate = true;
    // Demand rendering stops completely once the response has settled.
    if (settling && canMove) state.invalidate();
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, 0, 2]} intensity={0.7} color="#8ba2c8" />
      <group ref={core} rotation={[0.2, 0.35, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.64, 0]} />
          <meshStandardMaterial color="#444c60" roughness={0.65} metalness={0.2} flatShading />
        </mesh>
        <mesh scale={1.003}>
          <icosahedronGeometry args={[0.64, 0]} />
          <meshBasicMaterial color="#8ba2c8" wireframe />
        </mesh>
      </group>
      <instancedMesh ref={nodes} args={[undefined, undefined, 6]} frustumCulled={false}>
        <instancedBufferAttribute attach="instanceColor" args={[scratch.colors, 3]} />
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial roughness={0.55} metalness={0.15} flatShading />
      </instancedMesh>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute ref={connections} attach="attributes-position" args={[scratch.lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#444c60" />
      </lineSegments>
      <mesh rotation={[0.3, 0.35, -0.2]} scale={compact ? [0.65, 1, 1] : [1.15, 0.9, 1]}>
        <torusGeometry args={[2.25, 0.008, 4, 80]} />
        <meshBasicMaterial color="#2c3242" />
      </mesh>
    </>
  );
}

export default function SpatialNodeScene() {
  const surface = useRef<HTMLDivElement>(null);
  const [lostContext, setLostContext] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const lost = () => setLostContext(true);
    element.addEventListener("webglcontextlost", lost);
    return () => element.removeEventListener("webglcontextlost", lost);
  }, []);

  // Let the local DOM error boundary replace the entire canvas on context loss.
  if (lostContext) throw new Error("Spatial field rendering unavailable");

  return (
    <div ref={surface} className={styles.surface} aria-hidden="true">
      <Canvas
        ref={canvas}
        frameloop="demand"
        camera={{ position: [0, 0, 8.2], fov: 42, near: 0.1, far: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        events={() => ({ enabled: false, priority: 0 })}
        style={{ pointerEvents: "none", touchAction: "auto" }}
      >
        <NodeComposition surface={surface} />
      </Canvas>
    </div>
  );
}
