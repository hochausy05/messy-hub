export function LinksHeader() {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
        <span>Directory</span>
        <span aria-hidden="true" className="text-[var(--border-default)]">/</span>
        <span>Connected Portals</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        Connected Destinations
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
        A curated visual directory of websites, external projects, and referenced
        destinations linked to this digital hub.
      </p>
    </header>
  );
}
