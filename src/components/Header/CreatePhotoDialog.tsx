import { useState, useEffect, useTransition } from "react";
import * as z from "zod";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAlbums } from "../../hooks/useAlbums";
import { useCreatePhoto } from "../../hooks/usePhotosApi";

import { Box } from "../Box";
import { Dialog } from "../Dialog";
import { Button } from "../Button";
import { Skeleton } from "../Skeleton";
import { TextField } from "../TextField";
import { FileInput } from "../FileInput";
import { Typography } from "../Typography";

const createPhotoFormSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  file: z
    .instanceof(FileList)
    .nullable()
    .refine((file) => file && file.length > 0, {
      message: "Campo obrigatório",
    }),
  albumsIds: z.array(z.string().uuid()).optional(),
});

export type CreatePhotoFormSchema = z.infer<typeof createPhotoFormSchema>;

export function CreatePhotoDialog() {
  const [open, setOpen] = useState(false);
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

  const { createPhoto } = useCreatePhoto();
  const { albums, isLoadingAlbums } = useAlbums();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreatePhotoFormSchema>({
    resolver: zodResolver(createPhotoFormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function handleToggleAlbum(albumId: string) {
    const albumsIds = getValues("albumsIds");
    const albumSet = new Set(albumsIds || []);

    if (albumSet.has(albumId)) {
      albumSet.delete(albumId);
    } else {
      albumSet.add(albumId);
    }

    setValue("albumsIds", Array.from(albumSet));
  }

  function onSubmit(payload: CreatePhotoFormSchema) {
    setIsCreatingPhoto(async () => {
      await createPhoto(payload);

      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary">Nova foto</Button>
      </Dialog.Trigger>

      <form id="create-photo" onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Content>
          <Dialog.Header title="Adicionar foto" divider />

          <div>
            <TextField.Root error={!!errors?.title}>
              <TextField.Control
                placeholder="Adicione um título"
                maxLength={255}
                {...register("title")}
              />
            </TextField.Root>
            {errors?.title && (
              <Typography variant="paragraph-sm" className="text-accent-red">
                {errors?.title.message}
              </Typography>
            )}
          </div>

          <Box className="bg-accent-brand/10 rounded-lg px-5 py-3">
            <Typography variant="paragraph-md" className="text-label">
              Tamanho máximo: 50MB
            </Typography>
            <br />
            <Typography variant="paragraph-md" className="text-label">
              Você pode selecionar arquivos em PNG, JPG, JPEG, WEBP ou SVG
            </Typography>
          </Box>

          <div>
            <FileInput.Root>
              <FileInput.Control
                {...register("file")}
                onChange={register("file").onChange}
              />
              <FileInput.Trigger />

              <div className="space-y-5">
                <FileInput.ImagePreview />
                <FileInput.Item onRemoveFile={() => setValue("file", null)} />
              </div>
            </FileInput.Root>

            {errors?.file && (
              <Typography variant="paragraph-sm" className="text-accent-red">
                {errors?.file.message}
              </Typography>
            )}
          </div>

          <Box className="space-y-4">
            <Typography variant="label-sm" className="text-label block">
              Selecionar album
            </Typography>

            <ul className="inline-flex flex-wrap gap-4">
              {isLoadingAlbums
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton rounded="lg" className="h-7 w-16" key={index} />
                  ))
                : albums.map((album) => (
                    <li key={album.id}>
                      <input
                        id={`create-photo-dialog-${album.id}`}
                        type="checkbox"
                        className="peer sr-only"
                        onClick={() => handleToggleAlbum(album.id)}
                      />
                      <Typography
                        as="label"
                        htmlFor={`create-photo-dialog-${album.id}`}
                        variant="paragraph-md"
                        className={twMerge(
                          "text-accent-paragraph flex items-center justify-center transition",
                          "h-7 px-3 py-1",
                          "border-border-primary cursor-pointer rounded-lg border",
                          "peer-checked:bg-accent-brand",
                        )}
                      >
                        {album.title}
                      </Typography>
                    </li>
                  ))}
            </ul>
          </Box>

          <Dialog.Actions divider>
            <Dialog.Action variant="secondary" disabled={isCreatingPhoto} close>
              Cancelar
            </Dialog.Action>
            <Dialog.Action
              type="submit"
              form="create-photo"
              disabled={isCreatingPhoto}
            >
              {isCreatingPhoto ? "Adicionando" : "Adicionar"}
            </Dialog.Action>
          </Dialog.Actions>
        </Dialog.Content>
      </form>
    </Dialog.Root>
  );
}
