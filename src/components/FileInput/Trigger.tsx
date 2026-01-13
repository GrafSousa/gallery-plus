import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { FileArrowUpIcon } from "@phosphor-icons/react";

import { Typography } from "../Typography";
import { useFileInputContext } from "./Root";

const trigger = tv({
  slots: {
    container: twMerge(
      "group flex w-full cursor-pointer flex-col items-center gap-1 px-5 py-6 transition",
      "border-border-primary rounded-lg border",
      "hover:border-border-active hover:bg-background-secondary",
    ),
    icon: "text-accent-span group-hover:text-accent-brand-light size-8",
    text: "text-placeholder group-hover:text-accent-brand-light text-center",
  },
  variants: {
    error: {
      true: {
        container:
          "border-error-500/30 bg-error-500/5 hover:border-accent-red ",
        icon: "text-error-400 group-hover:text-accent-red",
        text: "text-error-400 group-hover:text-accent-red",
      },
    },
  },
});

type TriggerVariants = VariantProps<typeof trigger>;
type TriggerProps = TriggerVariants;

export function Trigger({ error }: TriggerProps) {
  const { container, icon, text } = trigger();
  const { id, file, maxFileSizeInMB, allowedExtensions } =
    useFileInputContext();

  const { fileSize = 0, fileExtension } = {
    fileSize: file?.size,
    fileExtension: file?.name?.split(".")?.pop()?.toLowerCase(),
  };

  const isValidExtension = () =>
    allowedExtensions.includes(fileExtension as FileInputExtensions);

  const isValidSize = () => fileSize <= maxFileSizeInMB * 1024 * 1024;

  if (file) return;

  return (
    <>
      <label htmlFor={id} className={container({ error })}>
        <FileArrowUpIcon className={icon({ error })} />
        <Typography variant="label-md" className={text({ error })}>
          Arraste o arquivo aqui
          <br />
          ou clique para selecionar
        </Typography>
      </label>

      {!isValidExtension && (
        <Typography className="text-accent-red">
          Tipo de arquivo inválido
        </Typography>
      )}

      {isValidSize && (
        <Typography className="text-accent-red">
          Arquivo maior que {maxFileSizeInMB}MB
        </Typography>
      )}
    </>
  );
}
