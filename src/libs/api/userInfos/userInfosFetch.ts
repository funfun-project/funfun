export type FetchOptions<TBody = unknown> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: TBody;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
};

export async function userInfosFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, credentials = 'include' } = options;

  const isFormData = body instanceof FormData;
  const fetchHeaders = { ...headers };

  if (!isFormData) {
    fetchHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: fetchHeaders,
    credentials,
    body: isFormData ? (body as BodyInit) : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${res.status}] ${endpoint} 실패: ${text}`);
  }

  return (await res.json()) as T;
}
