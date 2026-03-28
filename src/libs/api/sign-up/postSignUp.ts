import { VerifyNicknameResponse } from '@/types/signUp-input-types';
import { postApi } from './postAPI';

import { request } from './request';
import { SignUpPayload } from '@/types/signUpPayLoad.types';

// export const PostEmailCode = (email: string) =>
//   postApi(`/api/users/send/code/${email}`, undefined, '메일 발송 중 오류가 발생했습니다.');
export const PostEmailCode = (email: string) =>
  postApi(
    `/api/users/send/code/${encodeURIComponent(email)}`,
    undefined,
    '메일 발송 중 오류가 발생했습니다.',
  );

export const RePostEmailCode = async (email: string) =>
  postApi(`/api/users/send/signup/${email}`, '메일 재발송 중 오류가 발생했습니다.');

export const VerifyEmailCode = async (form: { email: string; code: string }) =>
  postApi(`/api/users/verify/code`, form, '이메일 코드 검증 중 오류가 발생했습니다.');

export const PostSignUp = (payload: SignUpPayload) =>
  request({
    url: '/api/users/signup',
    method: 'POST',
    data: payload,
    errorMessage: '회원가입에 실패했습니다.',
  });
export const PostVerifyNickname = (nickname: string) =>
  request<VerifyNicknameResponse>({
    url: '/api/users/verify/nickname',
    method: 'POST',
    data: { nickname },
    errorMessage: '닉네임 중복 확인에 실패했습니다.',
  });
