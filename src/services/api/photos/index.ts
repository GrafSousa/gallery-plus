import type { Photo } from "../../../models/photo";
import type { HttpClient } from "../http";

export interface PhotoApi {
  getPhotos: () => Promise<Photo[]>;
}

export class PhotoServiceImpl implements PhotoApi {
  private httpClient: HttpClient;

  url = "photos";

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getPhotos(): Promise<Photo[]> {
    return this.httpClient.get(this.url);
  }
}

let instance: PhotoApi;

export function getPhotoApiInstance(httpClient: HttpClient) {
  if (!instance) {
    instance = new PhotoServiceImpl(httpClient);
  }

  return instance;
}
