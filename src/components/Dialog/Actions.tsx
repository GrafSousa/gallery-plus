import { Divider } from "../Divider";

type DialogActionsProps = React.ComponentProps<"footer"> & {
  divider?: boolean;
};

export function DialogActions({ divider, ...props }: DialogActionsProps) {
  return (
    <>
      {divider && <Divider />}
      <footer className="flex items-center justify-end gap-3" {...props} />
    </>
  );
}
