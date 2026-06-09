import { Link, Outlet } from "@tanstack/react-router";

export const RootLayout = () => (
  <main className="app-shell">
    <nav aria-label="Primary" className="top-nav">
      <Link activeProps={{ className: "active" }} to="/">
        Overview
      </Link>
      <Link activeProps={{ className: "active" }} to="/settings">
        Config
      </Link>
    </nav>
    <Outlet />
  </main>
);
