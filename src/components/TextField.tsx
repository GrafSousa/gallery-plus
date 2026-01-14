import { twMerge } from "tailwind-merge";

type TextFieldPrefixProps = React.ComponentProps<"div">;

export function TextFieldPrefix(props: TextFieldPrefixProps) {
  return <div {...props} />;
}

type TextFieldControlProps = React.ComponentProps<"input">;

export function TextFieldControl(props: TextFieldControlProps) {
  return (
    <input
      className={twMerge(
        "text-accent-paragraph flex flex-1 bg-transparent outline-none",
        "placeholder:text-placeholder",
        "disabled:cursor-not-allowed",
      )}
      {...props}
    />
  );
}

type TextFieldRootProps = React.ComponentProps<"div">;

export function TextFieldRoot({ className, ...props }: TextFieldRootProps) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-3",
        "border-border-primary rounded-sm border bg-transparent p-3",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export const TextField = {
  Root: TextFieldRoot,
  Control: TextFieldControl,
  Prefix: TextFieldPrefix,
};
