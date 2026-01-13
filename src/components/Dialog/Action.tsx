import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Button } from "../Button";

type DialogActionProps = React.ComponentProps<typeof Button> & {
  close?: boolean;
};

export function DialogAction({ close = false, ...props }: DialogActionProps) {
  return close ? (
    <DialogPrimitive.Close asChild>
      <Button {...props} />
    </DialogPrimitive.Close>
  ) : (
    <Button {...props} />
  );
}
