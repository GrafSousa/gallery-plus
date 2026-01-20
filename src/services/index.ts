import { getFetchInstance } from "./api/http/fetch";
import { getPhotoApiInstance, type PhotoApi } from "./api/photos";
import { getAlbumsApiInstance, type AlbumsApi } from "./api/albums";

const BASE_URL = import.meta.env.VITE_API_URL;

const fetchHttpClient = getFetchInstance(BASE_URL);

export interface Apis {
  photosApi: PhotoApi;
  albumsApi: AlbumsApi;
}

let instance: Apis;

export function getApisInstance() {
  if (!instance) {
    instance = {
      photosApi: getPhotoApiInstance(fetchHttpClient),
      albumsApi: getAlbumsApiInstance(fetchHttpClient),
    };
  }

  return instance;
}
