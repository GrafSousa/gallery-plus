import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const iconButton = tv({
  base: twMerge(
    "flex items-center justify-center rounded-sm cursor-pointer text-label size-10 transition",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  variants: {
    variant: {
      primary: "bg-accent-brand hover:bg-accent-brand-light",
      secondary: "bg-background-secondary hover:bg-background-tertiary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type IconButtonVariants = VariantProps<typeof iconButton>;

interface IconButtonProps
  extends React.ComponentProps<"button">, IconButtonVariants {
  icon: React.ElementType;
}

export function IconButton(props: IconButtonProps) {
  const { type = "button", icon: Icon, variant, className, ...rest } = props;

  return (
    <button
      type={type}
      className={iconButton({ variant, className })}
      {...rest}
    >
      <Icon aria-hidden />
    </button>
  );
}
