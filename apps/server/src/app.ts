import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { serveStatic } from "@hono/node-server/serve-static";
import { type ToolConfig, toPublicToolConfig } from "@tool-base/config/schema";
import { Hono } from "hono";
import { logger } from "hono/logger";

export interface ServerAppOptions {
  config: ToolConfig;
  configExists: boolean;
  configPath: string;
  webDistPath?: string;
}

export const createServerApp = (options: ServerAppOptions): Hono => {
  const app = new Hono();

  app.use(logger());

  app.get("/", (c) => c.text("Tool Base API"));
  app.get("/api/health", (c) =>
    c.json({
      service: "tool-base",
      status: "ok",
    })
  );
  app.get("/api/config", (c) =>
    c.json({
      config: toPublicToolConfig(options.config),
      configPath: options.configPath,
      exists: options.configExists,
    })
  );
  app.get("/api/sample", (c) =>
    c.json({
      description: "Sample endpoint. Replace with tool-specific routes.",
      enabled: options.config.features.sampleApi,
      items: options.config.features.sampleApi
        ? [
            { id: "server", label: "Hono API shell" },
            { id: "web", label: "TanStack Router + Query shell" },
            { id: "config", label: "JSON config loader" },
          ]
        : [],
      serverName: options.config.server.name,
    })
  );

  mountWebApp(app, options.webDistPath ?? defaultWebDistPath);

  return app;
};

const defaultWebDistPath = fileURLToPath(
  new URL("../../web/dist", import.meta.url)
);
const appPathPrefixPattern = /^\/app/;

const mountWebApp = (app: Hono, webDistPath: string): void => {
  if (!existsSync(webDistPath)) {
    return;
  }

  app.use(
    "/app/*",
    serveStatic({
      rewriteRequestPath: (path) =>
        path.replace(appPathPrefixPattern, "") || "/",
      root: webDistPath,
    })
  );
  app.get(
    "/app",
    serveStatic({
      path: "index.html",
      root: webDistPath,
    })
  );
  app.get(
    "/app/*",
    serveStatic({
      path: "index.html",
      root: webDistPath,
    })
  );
};
