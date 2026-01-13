import * as DialogPrimitive from "@radix-ui/react-dialog";

import { DialogHeader } from "./Header";
import { DialogContent } from "./Content";
import { DialogActions } from "./Actions";
import { DialogAction } from "./Action";

type DialogRootProps = DialogPrimitive.DialogProps;

function DialogRoot(props: DialogRootProps) {
  return <DialogPrimitive.Root {...props} />;
}

type DialogTriggerProps = DialogPrimitive.DialogTriggerProps;

function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger {...props} />;
}

export const Dialog = {
  Root: DialogRoot,
  Header: DialogHeader,
  Action: DialogAction,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Actions: DialogActions,
};
