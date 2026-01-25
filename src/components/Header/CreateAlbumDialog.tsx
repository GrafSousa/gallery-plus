import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { usePhotos } from "../../hooks/usePhotosApi";
import { useCreateAlbum } from "../../hooks/useAlbums";

import SelectCheckboxIcon from "../../assets/images/select-checkbox.svg?react";

import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Checkbox } from "../Checkbox";
import { TextField } from "../TextField";
import { Typography } from "../Typography";
import { ImagePreview } from "../ImagePreview";

const createAlbumSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  photosId: z.array(z.string().uuid()).optional(),
});

export type CreateAlbumSchema = z.infer<typeof createAlbumSchema>;

export function CreateAlbumDialog() {
  const { photos } = usePhotos();
  const { createAlbum } = useCreateAlbum();
  const [open, setOpen] = useState(false);
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();
  const {
    register,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAlbumSchema>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createAlbumSchema),
  });

  function handleTogglePhoto(photoId: string) {
    const formPhotosId = getValues("photosId") || [];

    const photosId = formPhotosId.includes(photoId)
      ? formPhotosId.filter((id) => id !== photoId)
      : [...formPhotosId, photoId];

    setValue("photosId", photosId);
  }

  function onSubmit(payload: CreateAlbumSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload);

      setOpen(false);
    });
  }

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Criar album</Button>
      </Dialog.Trigger>

      <form id="create-album" onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Content>
          <Dialog.Header title="Criar album" />

          <div>
            <TextField.Root error={!!errors?.title}>
              <TextField.Control
                placeholder="Adicione um título"
                {...register("title")}
              />
            </TextField.Root>

            {errors?.title && (
              <Typography variant="paragraph-sm" className="text-accent-red">
                {errors?.title.message}
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="label-sm" className="text-label">
              Fotos cadastradas
            </Typography>

            {photos?.length > 0 ? (
              <ul className="grid grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <li
                    key={photo.id}
                    className="has-[input:checked]:ring-accent-brand relative has-[input:checked]:rounded-lg has-[input:checked]:ring-2"
                  >
                    <Controller
                      name="photosId"
                      control={control}
                      render={() => (
                        <Checkbox
                          className="absolute top-1.5 left-1.5"
                          onChange={() => handleTogglePhoto(photo.id)}
                        />
                      )}
                    />
                    <ImagePreview
                      className="h-20"
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <SelectCheckboxIcon />

                <Typography
                  variant="paragraph-md"
                  className="text-accent-paragraph"
                >
                  Nenhuma foto disponível para seleção
                </Typography>
              </div>
            )}
          </div>

          <Dialog.Actions divider>
            <Dialog.Action variant="secondary" close>
              Cancelar
            </Dialog.Action>
            <Dialog.Action type="submit" form="create-album">
              {isCreatingAlbum ? "Criando..." : "Criar"}
            </Dialog.Action>
          </Dialog.Actions>
        </Dialog.Content>
      </form>
    </Dialog.Root>
  );
}
