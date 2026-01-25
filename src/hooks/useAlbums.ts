import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiContext } from "../contexts/ApiContext";
import { usePhotoApi, usePhotos } from "./usePhotosApi";
import type { CreateAlbumSchema } from "../components/Header/CreateAlbumDialog";

function useAlbumsApi() {
  const apiContext = useContext(ApiContext);

  if (Object.keys(apiContext).length === 0) {
    throw new Error("useAlbums should be used with ApiContext");
  }

  const {
    apis: { albumsApi },
  } = apiContext;

  return { albumsApi };
}

export function useAlbums() {
  const { albumsApi } = useAlbumsApi();

  const { data, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: async () => await albumsApi.getAlbums(),
  });

  return {
    albums: data || [],
    isLoadingAlbums: isLoading,
  };
}

export function useCreateAlbum() {
  const { albumsApi } = useAlbumsApi();
  const { photosApi } = usePhotoApi();
  const { photos } = usePhotos();
  const queryClient = useQueryClient();

  async function createAlbum({ title, photosId }: CreateAlbumSchema) {
    try {
      const albumResponse = await albumsApi.createAlbum(title);

      if (photosId && photosId.length > 0) {
        Promise.all(
          photosId.map((photoId) => {
            const albumIds =
              photos
                .find((p) => p.id === photoId)
                ?.albums.map((album) => album.id) || [];

            photosApi.managePhotoAlbums({
              photoId,
              albumsIds: [...albumIds, albumResponse.id],
            });
          }),
        );
      }

      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { createAlbum };
}
