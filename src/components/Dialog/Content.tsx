import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Card } from "../Card";

interface DialogContentProps {
  overlay?: boolean;
  children: React.ReactNode;
}

export function DialogContent(props: DialogContentProps) {
  const { children, overlay = true } = props;

  return (
    <DialogPrimitive.Portal>
      {overlay && (
        <DialogPrimitive.Overlay
          className={twMerge(
            "bg-background-secondary/60 fixed inset-0 z-5 backdrop-blur-sm",
            "data-[state=open]:animate-in",
            "data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0",
          )}
        />
      )}

      <DialogPrimitive.Content
        className={twMerge(
          "fixed top-[50%] left-[50%] w-full max-w-lg",
          "z-10 translate-x-[-50%] translate-y-[-50%]",
          "data-[state=open]:animate-in",
          "data-[state=open]:fade-in-0",
          "data-[state=open]:slide-in-from-bottom-[48%]",
          "data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0",
          "data-[state=closed]:slide-out-to-bottom-[48%]",
        )}
      >
        <Card>{children}</Card>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
