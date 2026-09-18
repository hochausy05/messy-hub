import type { ReactNode } from "react";

import { SkipLink } from "./skip-link";

type SiteShellProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export function SiteShell({ children, header, footer }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      {header ? <header>{header}</header> : null}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {footer ? <footer>{footer}</footer> : null}
    </>
  );
}
