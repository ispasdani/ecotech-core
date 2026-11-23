/**
 * Re-mounts on every navigation, so each route fades in softly.
 * Opacity only: a transform here would break pinned ScrollTriggers.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
