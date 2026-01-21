import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiContext } from "../contexts/ApiContext";

export function useAlbums() {
  const apiContext = useContext(ApiContext);

  if (Object.keys(apiContext).length === 0) {
    throw new Error("useAlbums should be used with ApiContext");
  }

  const {
    apis: { albumsApi },
  } = apiContext;

  const { data, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: async () => await albumsApi.getAlbums(),
  });

  return {
    albums: data || [],
    isLoadingAlbums: isLoading,
  };
}
