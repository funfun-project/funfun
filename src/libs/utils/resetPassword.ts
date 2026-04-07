export type FieldType = 'email' | 'emailVerification' | 'password' | 'passwordVerification';

export type ResetPasswordForm = {
  email: string | null;
  emailVerification: string | null;
  password: string | null;
  passwordVerification: string | null;
};

export const initialForm: ResetPasswordForm = {
  email: '',
  emailVerification: null,
  password: '',
  passwordVerification: '',
};

export type ValidationArg = {
  [K in FieldType]: { type: K; value: ResetPasswordForm[K] };
}[FieldType];

export type CommitFieldFn = <K extends FieldType>(
  fieldType: K,
  value: ResetPasswordForm[K],
) => boolean;

export function validationInput(arg: ValidationArg): string | null {
  switch (arg.type) {
    case 'email':
      return arg.value ? null : '이메일 입력해 주세요.';
    case 'emailVerification':
      return arg.value ? null : '숫자 6자리를 입력해 주세요';
    case 'password':
      return arg.value ? null : '비밀번호를 입력해 주세요';
    case 'passwordVerification':
      return arg.value ? null : '바뀐 비밀번호를 입력해 주세요';

    default:
      return '알 수 없는 입력값입니다.';
  }
}
