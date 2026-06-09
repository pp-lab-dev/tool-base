import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSample } from "@/lib/api";

export const HomePage = () => {
  const sampleQuery = useQuery({
    queryFn: getSample,
    queryKey: ["sample"],
  });

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Tool Base</p>
        <h1>Base architecture sample</h1>
        <p className="summary">
          A minimal server, web, config, routing, query, and API scaffold with
          no product logic attached.
        </p>
        <div className="hero-actions">
          <Badge variant="success">shadcn/ui sample</Badge>
          <Badge variant="outline">TanStack Query</Badge>
        </div>
        <Button onClick={() => sampleQuery.refetch()} type="button">
          Refresh sample API
        </Button>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Sample API</CardTitle>
          <CardDescription>
            This panel uses local shadcn-style primitives instead of the older
            base UI sample package.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sampleQuery.isPending ? <p>Loading sample API...</p> : null}
          {sampleQuery.isError ? (
            <p className="error-text">{sampleQuery.error.message}</p>
          ) : null}
          {sampleQuery.data ? (
            <div className="panel-stack">
              <p>{sampleQuery.data.description}</p>
              <p>Server: {sampleQuery.data.serverName}</p>
              <ul className="sample-list">
                {sampleQuery.data.items.map((item) => (
                  <li key={item.id}>{item.label}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};
