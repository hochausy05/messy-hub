import type { ElementType, ReactNode } from "react";

type SectionFrameProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
};

export function SectionFrame({
  as: Component = "section",
  id,
  className = "",
  children,
  "aria-labelledby": ariaLabelledBy,
}: SectionFrameProps) {
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}
