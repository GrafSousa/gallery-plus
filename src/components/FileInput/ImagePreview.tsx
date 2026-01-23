import { useMemo } from "react";
import { useFileInputContext } from "./Root";

import { ImagePreview } from "../ImagePreview";

export function FileInputImagePreview() {
  const { file } = useFileInputContext();

  const previewURL = useMemo(() => {
    if (!file) return;

    return URL.createObjectURL(file);
  }, [file]);

  if (!file) return;

  return <ImagePreview src={previewURL} />;
}
