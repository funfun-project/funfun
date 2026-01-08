import { LoginPayload } from '@/types/login-types';
import { request } from './request';

export const PostLogin = (payload: LoginPayload) =>
  request({
    url: '/api/auth/login',
    data: payload,
    errorMessage: '로그인에 실패했습니다.',
    credentials: 'include',
  });
