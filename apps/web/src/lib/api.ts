import type { PublicToolConfig } from "@tool-base/config/schema";

export interface ConfigResponse {
  config: PublicToolConfig;
  configPath: string;
  exists: boolean;
}

export interface SampleItem {
  id: string;
  label: string;
}

export interface SampleResponse {
  description: string;
  enabled: boolean;
  items: SampleItem[];
  serverName: string;
}

const requestJson = async <TResponse>(path: string): Promise<TResponse> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as TResponse;
};

export const getConfig = (): Promise<ConfigResponse> =>
  requestJson<ConfigResponse>("/api/config");

export const getSample = (): Promise<SampleResponse> =>
  requestJson<SampleResponse>("/api/sample");
