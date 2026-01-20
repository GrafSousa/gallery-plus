import { tv, type VariantProps } from "tailwind-variants";

export const typographyVariants = tv({
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

type ITypographyVariants = VariantProps<typeof typographyVariants>;

export type TypographyProps<T extends React.ElementType = "span"> =
  ITypographyVariants & {
    as?: T;
    className?: string;
    children: React.ReactNode;
  } & React.ComponentPropsWithoutRef<T>;

export function Typography<T extends React.ElementType = "span">(
  props: TypographyProps<T>,
) {
  const { as = "span", variant, className, children, ...rest } = props;

  const Component = as || "span";

  return (
    <Component className={typographyVariants({ variant, className })} {...rest}>
      {children}
    </Component>
  );
}
