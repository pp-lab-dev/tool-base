import { serve } from "@hono/node-server";
import { loadToolConfig } from "@tool-base/config/server";
import { createServerApp } from "./app";

const { config, configPath, exists } = loadToolConfig();
const app = createServerApp({
  config,
  configExists: exists,
  configPath,
});

serve(
  {
    fetch: app.fetch,
    port: config.server.port,
  },
  (info) => {
    console.log(`Tool Base server is running on http://localhost:${info.port}`);
    console.log(`Config loaded from ${configPath}`);
  }
);
