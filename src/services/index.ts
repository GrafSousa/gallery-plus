import { getFetchInstance } from "./api/http/fetch";
import { getPhotoApiInstance, type PhotoApi } from "./api/photo";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchHttpClient = getFetchInstance(BASE_URL);

export interface Apis {
  photos: PhotoApi;
}

let instance: Apis;

export function getApisInstance() {
  if (!instance) {
    instance = {
      photos: getPhotoApiInstance(fetchHttpClient),
    };
  }

  return instance;
}
