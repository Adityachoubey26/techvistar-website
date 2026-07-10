/** Minimal route-level suspense fallback — avoids layout shift on navigation */
export function RouteFallback() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center bg-background"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-8 w-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
    </div>
  );
}
