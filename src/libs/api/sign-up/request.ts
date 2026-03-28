// src/libs/api/request.ts

interface RequestConfig extends RequestInit {
  url: string;
  data?: unknown;
  errorMessage?: string;
  auth?: boolean;
}

export async function request<T>({
  url,
  data,
  errorMessage,
  auth = false,
  headers,
  method,
  ...options
}: RequestConfig): Promise<T> {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...(auth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    json = undefined;
  }

  if (!response.ok) {
    const message =
      typeof json === 'object' && json !== null && 'message' in json
        ? String((json as { message?: unknown }).message)
        : (errorMessage ?? 'API 요청 실패');

    throw new Error(message);
  }

  return json as T;
}
