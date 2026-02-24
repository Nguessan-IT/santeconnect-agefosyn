/**
 * CSS-only animated background with floating gradient blobs and grid overlay.
 * Uses GPU-accelerated transforms and opacity — zero JS overhead.
 */
export default function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="animated-bg__blob animated-bg__blob--1" />
      <div className="animated-bg__blob animated-bg__blob--2" />
      <div className="animated-bg__blob animated-bg__blob--3" />
      <div className="animated-bg__blob animated-bg__blob--4" />
      <div className="animated-bg__grid" />
    </div>
  );
}
