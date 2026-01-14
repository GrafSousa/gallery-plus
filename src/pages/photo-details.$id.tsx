import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/photo-details/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/photo-details/$id"!</div>;
}
