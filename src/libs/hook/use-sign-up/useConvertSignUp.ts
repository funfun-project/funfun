import { ISignUpForm } from '@/types/auth.types';
import { SignUpPayload } from '@/types/signUpPayLoad.types';

export const convertToSignUpPayload = (form: ISignUpForm): SignUpPayload => {
  return {
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    nickname: form.name,
    address: form.adress,
    birthDate: form.birth,
    gender: form.gender as 'MALE' | 'FEMALE',
    latitude: 0.1,
    longitude: 0.1,
    isMarketingAgreed: true,
  };
};
