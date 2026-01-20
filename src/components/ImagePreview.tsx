import { twMerge } from "tailwind-merge";

type ImagePreviewProps = React.ComponentProps<"img">;

export function ImagePreview({ className, ...props }: ImagePreviewProps) {
  return (
    <img
      className={twMerge(
        "h-56 w-full overflow-hidden rounded-lg object-cover",
        className,
      )}
      {...props}
    />
  );
}
