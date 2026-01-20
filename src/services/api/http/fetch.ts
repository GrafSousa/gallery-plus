import type { HttpClient } from ".";

class FetchHttpClient implements HttpClient {
  private baseUrl;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string) {
    return `${this.baseUrl}/${path}`;
  }

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(this.buildUrl(path), {
      ...options,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async post<T>(
    path: string,
    body: unknown,
    options?: RequestInit,
  ): Promise<T> {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}

let instance: FetchHttpClient;

export function getFetchInstance(baseUrl: string) {
  if (!instance) {
    instance = new FetchHttpClient(baseUrl);
  }

  return instance;
}
