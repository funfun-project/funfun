export interface SignUpPayload {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
}
