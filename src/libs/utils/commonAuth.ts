// 공통 규격: 이메일 인증에 필요한 최소 필드
export interface CommonAuthForm {
  email: string | null;
  emailVerification: string | null;
  password: string | null;
}

// 공통 필드 타입
export type CommonAuthFieldType = 'email' | 'emailVerification' | 'password';

// 공통 커밋 함수 규격
export type CommonCommitFn<T> = (fieldType: keyof T, value: string | null) => boolean;
