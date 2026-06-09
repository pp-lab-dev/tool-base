import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getConfig } from "@/lib/api";

export const SettingsPage = () => {
  const configQuery = useQuery({
    queryFn: getConfig,
    queryKey: ["config"],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loaded Config</CardTitle>
        <CardDescription>
          Example settings surface with a few reusable primitives ready to
          extend.
        </CardDescription>
      </CardHeader>
      <CardContent className="panel-stack">
        {configQuery.isPending ? <p>Loading config...</p> : null}
        {configQuery.isError ? (
          <p className="error-text">{configQuery.error.message}</p>
        ) : null}
        {configQuery.data ? (
          <>
            <div className="settings-toolbar">
              <Badge variant="default">Config path</Badge>
              <Input readOnly value={configQuery.data.configPath} />
            </div>
            <dl className="config-grid">
              <dt>Exists</dt>
              <dd>{configQuery.data.exists ? "Yes" : "No"}</dd>
              <dt>Server port</dt>
              <dd>{configQuery.data.config.server.port}</dd>
              <dt>Web title</dt>
              <dd>{configQuery.data.config.web.title}</dd>
              <dt>Sample API</dt>
              <dd>
                {configQuery.data.config.features.sampleApi ? "On" : "Off"}
              </dd>
            </dl>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};
