import { tv, type VariantProps } from "tailwind-variants";

const divider = tv({
  base: "bg-border-primary",
  variants: {
    orientation: {
      vertical: "h-full w-px",
      horizontal: "w-full h-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type DividerVariants = VariantProps<typeof divider>;

type DividerProps = React.ComponentProps<"div"> & DividerVariants;

export function Divider({ orientation, className, ...props }: DividerProps) {
  return <div className={divider({ orientation, className })} {...props} />;
}
