import { tv, type VariantProps } from "tailwind-variants";
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

const textFieldRootVariants = tv({
  base: `flex items-center gap-3
        border-border-primary rounded-sm border bg-transparent p-3
        disabled:cursor-not-allowed`,
  variants: {
    error: {
      true: "border-accent-red",
    },
  },
  defaultVariants: {
    error: false,
  },
});

type TextFieldRootProps = React.ComponentProps<"div"> &
  VariantProps<typeof textFieldRootVariants>;

export function TextFieldRoot({
  className,
  error,
  ...props
}: TextFieldRootProps) {
  return (
    <div className={textFieldRootVariants({ error, className })} {...props} />
  );
}

export const TextField = {
  Root: TextFieldRoot,
  Control: TextFieldControl,
  Prefix: TextFieldPrefix,
};
