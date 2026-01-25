import type { Album } from "../../../models/album";
import type { HttpClient } from "../http";

export interface AlbumsApi {
  getAlbums: () => Promise<Album[]>;
  createAlbum: (title: string) => Promise<Album>;
}

class AlbumsServiceImpl implements AlbumsApi {
  private httpClient: HttpClient;

  url = "albums";

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAlbums(): Promise<Album[]> {
    return this.httpClient.get(this.url);
  }

  async createAlbum(title: string): Promise<Album> {
    return this.httpClient.post(this.url, { title });
  }
}

let instance: AlbumsApi;

export function getAlbumsApiInstance(httpClient: HttpClient) {
  if (!instance) {
    instance = new AlbumsServiceImpl(httpClient);
  }

  return instance;
}
