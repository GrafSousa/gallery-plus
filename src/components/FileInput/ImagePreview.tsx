import { useMemo } from "react";
import { useFileInputContext } from "./Root";

export function ImagePreview() {
  const { file } = useFileInputContext();

  const previewURL = useMemo(() => {
    if (!file) return;

    return URL.createObjectURL(file);
  }, [file]);

  if (!file) return;

  return (
    <img
      src={previewURL}
      className="h-56 w-full overflow-hidden rounded-lg object-cover"
    />
  );
}
