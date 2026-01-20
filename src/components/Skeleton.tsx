import { tv, type VariantProps } from "tailwind-variants";
import { Box } from "./Box";

const skeleton = tv({
  base: "animate-pulse bg-background-tertiary pointer-events-none",
  variants: {
    rounded: {
      sm: "rounded-sm",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "sm",
  },
});

type SkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeleton>;

export function Skeleton({ rounded, className, ...props }: SkeletonProps) {
  return <Box className={skeleton({ rounded, className })} {...props} />;
}
