import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type ToolConfig, toolConfigSchema } from "./schema";

export interface LoadedToolConfig {
  config: ToolConfig;
  configPath: string;
  exists: boolean;
}

const packageRoot = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

export const getDefaultConfigPath = (): string =>
  resolve(packageRoot, "config.json");

export const getExampleConfigPath = (): string =>
  resolve(packageRoot, "config.example.json");

export const resolveConfigPath = (): string => {
  if (process.env.SERVER_CONFIG_PATH) {
    return resolve(process.env.SERVER_CONFIG_PATH);
  }

  const defaultConfigPath = getDefaultConfigPath();
  return existsSync(defaultConfigPath)
    ? defaultConfigPath
    : getExampleConfigPath();
};

export const loadToolConfig = (): LoadedToolConfig => {
  const configPath = resolveConfigPath();
  const rawConfig = JSON.parse(readFileSync(configPath, "utf8")) as unknown;

  return {
    config: toolConfigSchema.parse(rawConfig),
    configPath,
    exists: existsSync(configPath),
  };
};
