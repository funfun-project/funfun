import { CommonAuthForm } from './commonAuth';

export type FieldType =
  | 'email'
  | 'emailVerification'
  | 'nickname'
  | 'password'
  | 'passwordVerification'
  | 'birthday'
  | 'gender'
  | 'address'
  | 'gatheringCategory'
  | 'eventCategory'
  | 'latitude'
  | 'longitude';

export interface SignUpForm extends CommonAuthForm {
  nickname: string | null;
  passwordVerification: string | null;
  birthday: string | null;
  gender: string;
  address: string;
  gatheringCategory: string | null;
  eventCategory: string | null;
  latitude: number | null;
  longitude: number | null;
}

export const initialForm: SignUpForm = {
  email: null,
  emailVerification: null,
  nickname: null,
  password: null,
  passwordVerification: null,
  birthday: null,
  gender: '',
  address: '',
  gatheringCategory: '',
  eventCategory: '',
  latitude: null,
  longitude: null,
};

export type ValidationArg = {
  [K in FieldType]: { type: K; value: SignUpForm[K] };
}[FieldType];

export type CommitFieldFn = <K extends FieldType>(
  fieldType: K,
  value: SignUpForm[K],
) => Promise<boolean>;

export function validationInput(arg: ValidationArg): string | null {
  switch (arg.type) {
    case 'email':
      return arg.value ? null : '이메일 입력해 주세요.';
    case 'emailVerification':
      return arg.value ? null : '숫자 6자리를 입력해 주세요';
    case 'nickname': {
      const value = arg.value?.trim();
      const regex = /^[a-z가-힣0-9]{1,8}$/;

      if (!value) return '닉네임을 입력해 주세요.';
      if (!regex.test(value)) return '소문자·한글·숫자로만 구성된 8자 이내로 입력해 주세요';

      return null;
    }
    case 'password':
      return arg.value ? null : '비밀번호를 입력해 주세요';
    case 'passwordVerification':
      return arg.value ? null : '바뀐 비밀번호를 입력해 주세요';
    case 'birthday':
      return arg.value ? null : '이메일 입력해 주세요.';
    case 'gender':
      return arg.value ? null : '이메일 입력해 주세요.';
    case 'address':
      return arg.value ? null : '이메일 입력해 주세요.';
    default:
      return '알 수 없는 입력값입니다.';
  }
}
