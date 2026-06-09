import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "@/features/root-layout";

export const Route = createRootRoute({
  component: RootLayout,
});
