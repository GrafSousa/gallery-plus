import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { usePhoto } from "../../hooks/usePhoto";
import { useAlbums } from "../../hooks/useAlbums";

import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Checkbox } from "../../components/Checkbox";
import { Skeleton } from "../../components/Skeleton";
import { Typography } from "../../components/Typography";
import { ImagePreview } from "../../components/ImagePreview";

import { PhotoNavigator } from "./-components/PhotoNavigator";

export const Route = createFileRoute("/photo-details/$photoId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { photoId } = Route.useParams();
  const { albums, isLoadingAlbums } = useAlbums();
  const { photo, isLoadingPhoto } = usePhoto(photoId);

  const albumLength = useMemo(() => albums.length ?? 0, [albums]);

  return (
    <>
      <PhotoNavigator loading={isLoadingPhoto} photo={photo} />

      <div className="grid-cols-photo-detail grid h-full gap-24">
        <div className="space-y-3">
          {isLoadingPhoto ? (
            <>
              <Skeleton className="h-56" />
              <Skeleton className="h-10 w-20" />
            </>
          ) : (
            <>
              <ImagePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              />
              <Button variant="secondary" className="text-accent-red">
                Excluir
              </Button>
            </>
          )}
        </div>

        <div className="space-y-6 p-3">
          <Typography as="h3" variant="heading-md" className="text-label">
            Albuns
          </Typography>

          <ul className="space-y-4">
            {isLoadingAlbums || isLoadingPhoto
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full" />
                ))
              : albums.map((album, index) => (
                  <li key={album.id}>
                    <div className="mb-4 inline-flex w-full items-center justify-between">
                      <Typography
                        variant="paragraph-lg"
                        className="text-accent-paragraph truncate"
                      >
                        {album.title}
                      </Typography>

                      <Checkbox
                        defaultChecked={
                          !!photo?.albums.find(
                            (photoAlbum) => photoAlbum.id === album.id,
                          )
                        }
                      />
                    </div>

                    {index < albumLength - 1 && <Divider />}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
}
