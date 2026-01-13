import { useFileInputContext } from "./Root";

type ControlProps = React.ComponentProps<"input">;

export function Control(props: ControlProps) {
  const { id, file, allowedExtensions, onFileSelected } = useFileInputContext();

  const accept = allowedExtensions.map((ext) => `.${ext}`).join(",");

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;

    const files = Array.from(event.target.files);

    onFileSelected(files[0]);
  }

  if (file) return;

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
