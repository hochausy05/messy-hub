export default function ExperimentLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex min-h-48 w-full max-w-5xl items-center px-4 py-10 text-sm text-[var(--text-muted)] sm:px-6 lg:px-8"
    >
      Loading experiment…
    </div>
  );
}
