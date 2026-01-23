import type { Photo } from "../../../models/photo";
import type { HttpClient } from "../http";

interface PhotoByIdResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

interface UploadPhotoRequest {
  file: File;
  photoId: string;
}

interface ManagePhotoAlbumsRequest {
  photoId: string;
  albumsIds: string[];
}

export interface PhotoApi {
  createPhoto: (title: string) => Promise<Photo>;
  getPhotos: (searchParams?: string) => Promise<Photo[]>;
  getPhotoById: (id: string) => Promise<PhotoByIdResponse>;
  uploadPhotoByPhotoId: (payload: UploadPhotoRequest) => Promise<void>;
  managePhotoAlbums: (payload: ManagePhotoAlbumsRequest) => Promise<void>;
}

export class PhotoServiceImpl implements PhotoApi {
  private httpClient: HttpClient;

  url = "photos";

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async createPhoto(title: string): Promise<Photo> {
    return this.httpClient.post(this.url, { title });
  }

  async getPhotos(searchParams?: string): Promise<Photo[]> {
    return this.httpClient.get(`${this.url}${searchParams}`);
  }

  async getPhotoById(id: string): Promise<PhotoByIdResponse> {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  async managePhotoAlbums(payload: ManagePhotoAlbumsRequest): Promise<void> {
    const { photoId, albumsIds } = payload;

    return this.httpClient.put(`${this.url}/${photoId}/albums`, { albumsIds });
  }

  async uploadPhotoByPhotoId(payload: UploadPhotoRequest): Promise<void> {
    const { file, photoId } = payload;

    const formData = new FormData();

    formData.append("file", file);

    return this.httpClient.post(`${this.url}/${photoId}/image`, formData);
  }
}

let instance: PhotoApi;

export function getPhotoApiInstance(httpClient: HttpClient) {
  if (!instance) {
    instance = new PhotoServiceImpl(httpClient);
  }

  return instance;
}
