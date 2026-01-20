import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext } from "../contexts/ApiContext";

export function usePhotosApi() {
  const apiContext = useContext(ApiContext);

  if (Object.keys(apiContext).length === 0) {
    throw new Error("usePhotosApi should be used with ApiContext");
  }

  const {
    apis: { photosApi },
  } = apiContext;

  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => await photosApi.getPhotos(),
  });

  return {
    photos: data || [],
    isLoading,
  };
}
