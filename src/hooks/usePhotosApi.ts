import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";

export function usePhotosApi() {
  const apiContext = useContext(ApiContext);

  if (Object.keys(apiContext).length === 0) {
    throw new Error("usePhotosApi should be used with ApiContext");
  }

  const { apis } = apiContext;

  return apis?.photosApi;
}
