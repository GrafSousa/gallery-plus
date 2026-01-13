type CardProps = React.ComponentProps<"div">;

export function Card(props: CardProps) {
  return (
    <div
      className="border-border-primary bg-background-primary flex flex-col gap-5 rounded-lg border p-8"
      {...props}
    />
  );
}
