import { z } from "zod";

export const toolConfigSchema = z.object({
  features: z.object({
    sampleApi: z.boolean(),
  }),
  server: z.object({
    name: z.string().min(1),
    port: z.number().int().min(1).max(65_535),
  }),
  web: z.object({
    title: z.string().min(1),
  }),
});

export type ToolConfig = z.infer<typeof toolConfigSchema>;

export interface PublicToolConfig {
  features: ToolConfig["features"];
  server: Pick<ToolConfig["server"], "name" | "port">;
  web: ToolConfig["web"];
}

export const toPublicToolConfig = (config: ToolConfig): PublicToolConfig => ({
  features: config.features,
  server: {
    name: config.server.name,
    port: config.server.port,
  },
  web: config.web,
});
