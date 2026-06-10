import { useQuery } from "@tanstack/react-query";
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
      <h1 className="page-title">Home</h1>
      <Button>Click me</Button>
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
