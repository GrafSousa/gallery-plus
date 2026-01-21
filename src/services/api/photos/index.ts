import type { Photo } from "../../../models/photo";
import type { HttpClient } from "../http";

interface PhotoByIdResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export interface PhotoApi {
  getPhotos: (searchParams?: string) => Promise<Photo[]>;
  getPhotoById: (id: string) => Promise<PhotoByIdResponse>;
}

export class PhotoServiceImpl implements PhotoApi {
  private httpClient: HttpClient;

  url = "photos";

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getPhotos(searchParams?: string): Promise<Photo[]> {
    return this.httpClient.get(`${this.url}${searchParams}`);
  }

  async getPhotoById(id: string): Promise<PhotoByIdResponse> {
    return this.httpClient.get(`${this.url}/${id}`);
  }
}

let instance: PhotoApi;

export function getPhotoApiInstance(httpClient: HttpClient) {
  if (!instance) {
    instance = new PhotoServiceImpl(httpClient);
  }

  return instance;
}
