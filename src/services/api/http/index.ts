export interface HttpClient {
  get<T>(path: string, options?: unknown): Promise<T>;
  put<T>(path: string, body: unknown, options?: unknown): Promise<T>;
  post<T>(path: string, body: unknown, options?: unknown): Promise<T>;
}
