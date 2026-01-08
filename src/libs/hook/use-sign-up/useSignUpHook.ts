import {
  PostEmailCode,
  PostSignUp,
  PostVerifyNickname,
  RePostEmailCode,
  VerifyEmailCode,
} from '@/libs/api/sign-up/postSignUp';
import { useBaseMutation } from './useBaseMutation';

/* 이메일 인증코드 발송 */
export const usePostEmailCode = () => useBaseMutation(PostEmailCode);

/* 이메일 인증코드 재발송 */
export const useRePostEmailCode = () => useBaseMutation(RePostEmailCode);

/* 이메일 코드 검증 */
export const useVerifyEmailCode = () => useBaseMutation(VerifyEmailCode);

/* 닉네임 중복 검사 */
export const useVerifyNickname = () => useBaseMutation(PostVerifyNickname);
/* 회원가입 완료 */
export const usePostSignUp = () => useBaseMutation(PostSignUp);
