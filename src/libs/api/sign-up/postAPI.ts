import { request } from './request';

export function postApi(url: string, data?: unknown, errorMessage?: string) {
  return request({
    url,
    method: 'POST',
    data,
    errorMessage,
  });
}
