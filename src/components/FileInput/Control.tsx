import { useFileInputContext } from "./Root";

type ControlProps = React.ComponentProps<"input">;

export function Control({ onChange, ...props }: ControlProps) {
  const { id, allowedExtensions, onFileSelected } = useFileInputContext();

  const accept = allowedExtensions.map((ext) => `.${ext}`).join(",");

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;

    const files = Array.from(event.target.files);

    if (onChange) {
      onChange(event);
    }

    onFileSelected(files[0]);
  }

  return (
    <input
      id={id}
      type="file"
      className="sr-only"
      onChange={handleFileSelected}
      accept={accept}
      {...props}
    />
  );
}
