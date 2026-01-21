import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryState, parseAsString, createSerializer } from "nuqs";

import { ApiContext } from "../contexts/ApiContext";

const searchParamsSerialized = createSerializer({
  albumId: parseAsString,
});

export function usePhotosApi() {
  const apiContext = useContext(ApiContext);
  const [albumId, setAlbumId] = useQueryState("albumId");

  if (Object.keys(apiContext).length === 0) {
    throw new Error("usePhotosApi should be used with ApiContext");
  }

  const {
    apis: { photosApi },
  } = apiContext;

  const { data, isLoading } = useQuery({
    queryKey: ["photos", albumId],
    queryFn: async () =>
      await photosApi.getPhotos(searchParamsSerialized({ albumId })),
  });

  return {
    photos: data || [],
    isLoadingPhotos: isLoading,
    filters: {
      albumId,
      setAlbumId,
    },
  };
}
