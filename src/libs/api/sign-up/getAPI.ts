import { useQuery } from '@tanstack/react-query';
import { request } from './request';
import { LoginPayload, LoginResponse, User } from '@/types/login-types';

export function getApi<T>(url: string, errorMessage?: string): Promise<T> {
  return request<T>({
    url,
    method: 'GET',
    errorMessage,
  });
}

export const postLogin = (payload: LoginPayload) =>
  request<LoginResponse>({
    url: '/api/users/login',
    method: 'POST',
    data: payload,
    errorMessage: '로그인 실패',
  });
