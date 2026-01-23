import { ImageIcon } from "@phosphor-icons/react";
import { Typography, typographyVariants } from "../Typography";
import { useFileInputContext } from "./Root";

interface ItemProps {
  onRemoveFile?: () => void;
}

export function Item({ onRemoveFile }: ItemProps) {
  const { file, onFileSelected } = useFileInputContext();

  if (!file) return;

  function handleRemoveFile() {
    if (onRemoveFile) {
      onRemoveFile();
    }

    onFileSelected(undefined);
  }

  return (
    <div className="border-border-primary flex items-center gap-3 rounded-sm border p-3">
      <ImageIcon className="fill-label size-4" />

      <div className="flex flex-col">
        <div className="max-w-80 truncate">
          <Typography variant="label-md" className="text-placeholder">
            {file.name}
          </Typography>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={handleRemoveFile}
            className={typographyVariants({
              variant: "label-sm",
              className: "text-accent-red cursor-pointer hover:underline",
            })}
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
