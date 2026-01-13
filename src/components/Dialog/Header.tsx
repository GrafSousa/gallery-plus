import { XIcon } from "@phosphor-icons/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Divider } from "../Divider";
import { Typography } from "../Typography";
import { IconButton } from "../IconButton";

interface DialogHeaderProps {
  title: string;
  divider?: boolean;
}

export function DialogHeader({ title, divider = true }: DialogHeaderProps) {
  return (
    <div>
      <header className="flex flex-row items-center justify-between">
        <DialogPrimitive.Title>
          <Typography variant="heading-md" className="text-heading">
            {title}
          </Typography>
        </DialogPrimitive.Title>
        <DialogPrimitive.Close asChild>
          <IconButton variant="ghost" icon={XIcon} />
        </DialogPrimitive.Close>
      </header>

      {divider && <Divider />}
    </div>
  );
}
