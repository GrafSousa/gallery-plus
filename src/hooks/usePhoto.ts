import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext } from "../contexts/ApiContext";

export function usePhoto(photoId: string) {
  const apiContext = useContext(ApiContext);

  if (Object.keys(apiContext).length === 0) {
    throw new Error("usePhoto should be used with ApiContext");
  }

  const {
    apis: { photosApi },
  } = apiContext;

  const { data, isLoading } = useQuery({
    queryKey: ["photo", photoId],
    queryFn: async () => await photosApi.getPhotoById(photoId),
  });

  return {
    photo: data,
    isLoadingPhoto: isLoading,
  };
}
