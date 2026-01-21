import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQueryState, parseAsString, createSerializer } from "nuqs";

import { ApiContext } from "../contexts/ApiContext";

const searchParamsSerialized = createSerializer({
  q: parseAsString,
  albumId: parseAsString,
});

export function usePhotosApi() {
  const apiContext = useContext(ApiContext);
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));
  const [albumId, setAlbumId] = useQueryState("albumId");

  if (Object.keys(apiContext).length === 0) {
    throw new Error("usePhotosApi should be used with ApiContext");
  }

  const {
    apis: { photosApi },
  } = apiContext;

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
