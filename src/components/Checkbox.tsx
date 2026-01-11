import { twMerge } from "tailwind-merge";

import { CheckIcon } from "@phosphor-icons/react";

type CheckboxProps = React.ComponentProps<"input">;

export function Checkbox(props: CheckboxProps) {
  return (
    <label className="group relative inline-flex items-center justify-center">
      <input
        type="checkbox"
        className={twMerge(
          "peer size-3 cursor-pointer appearance-none overflow-hidden rounded-xs p-1 transition outline-none",
          "border-border-primary border",
          "hover:border-border-active",
          "disabled:cursor-not-allowed",
          "focus-within:ring-accent-brand-light focus-within:ring-1",
          "checked:border-accent-brand checked:bg-accent-brand",
          "group-hover:checked:border-accent-brand-light group-hover:checked:bg-accent-brand-light",
        )}
        {...props}
      />

      <CheckIcon
        aria-hidden
        className={twMerge(
          "absolute top-1/2 hidden size-1 -translate-y-1/2 cursor-pointer",
          "peer-disabled:cursor-not-allowed",
          "peer-checked:fill-label peer-checked:block",
        )}
      />
    </label>
  );
}
