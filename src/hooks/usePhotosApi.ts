import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState, parseAsString, createSerializer } from "nuqs";

import { ApiContext } from "../contexts/ApiContext";
import type { CreatePhotoFormSchema } from "../components/Header/CreatePhotoDialog";

const searchParamsSerialized = createSerializer({
  q: parseAsString,
  albumId: parseAsString,
});

export function usePhotoApi() {
  const apiContext = useContext(ApiContext);

  if (Object.keys(apiContext).length === 0) {
    throw new Error("usePhoto should be used with ApiContext");
  }

  const {
    apis: { photosApi },
  } = apiContext;

  return { photosApi };
}

export function usePhotos() {
  const { photosApi } = usePhotoApi();
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [albumId, setAlbumId] = useQueryState("albumId");

  const { data, isLoading } = useQuery({
    queryKey: ["photos", albumId, q],
    queryFn: async () =>
      await photosApi.getPhotos(searchParamsSerialized({ albumId, q })),
  });

  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
    filters: {
      q,
      setQ,
      albumId,
      setAlbumId,
    },
  };
}

export function usePhoto(photoId: string) {
  const { photosApi } = usePhotoApi();

  const { data, isLoading } = useQuery({
    queryKey: ["photo", photoId],
    queryFn: async () => await photosApi.getPhotoById(photoId),
  });

  return {
    photo: data,
    isLoadingPhoto: isLoading,
  };
}

export function useCreatePhoto() {
  const { photosApi } = usePhotoApi();
  const queryClient = useQueryClient();

  async function createPhoto(payload: CreatePhotoFormSchema) {
    try {
      const { title, file, albumsIds } = payload;
      const photo = await photosApi.createPhoto(title);

      if (file) {
        await photosApi.uploadPhotoByPhotoId({
          photoId: photo.id,
          file: file[0],
        });
      }

      if (albumsIds && albumsIds?.length > 0) {
        photosApi.managePhotoAlbums({ photoId: photo.id, albumsIds });
      }

      queryClient.invalidateQueries({ queryKey: ["photo"] });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { createPhoto };
}
