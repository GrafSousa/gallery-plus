import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: twMerge(
    "flex items-center justify-center px-3 py-2 rounded-sm cursor-pointer transition",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  variants: {
    variant: {
      primary: "bg-accent-brand text-label-inverse hover:bg-accent-brand-light",
      secondary:
        "bg-background-secondary text-label hover:bg-background-tertiary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariants & {
    className?: string;
  };

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={button({ variant, className })} {...props} />;
}
