import { tv, type VariantProps } from "tailwind-variants";

const typography = tv({
  variants: {
    variant: {
      "heading-sm": "text-lg leading-[130%] font-bold",
      "heading-md": "text-xl leading-[130%] font-bold",
      "heading-lg": "text-2xl leading-[130%] font-bold",
      "paragraph-sm": "text-xs leading-[150%] font-medium",
      "paragraph-md": "text-sm leading-[150%] font-medium",
      "paragraph-lg": "text-base leading-[150%] font-medium",
      "label-sm": "text-xs leading-[150%] font-semibold",
      "label-md": "text-base leading-[150%] font-semibold",
    },
  },
  defaultVariants: {
    variant: "paragraph-sm",
  },
});

type ButtonVariants = VariantProps<typeof typography>;

type TypographyProps<T extends React.ElementType = "span"> = ButtonVariants & {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<T>;

export function Typography<T extends React.ElementType = "span">(
  props: TypographyProps<T>,
) {
  const { as = "span", variant, className, children } = props;

  const Component = as || "span";

  return (
    <Component className={typography({ variant, className })}>
      {children}
    </Component>
  );
}
