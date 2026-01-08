// types/login-types.ts
export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
}
export interface User {
  email: string;
  password: string;
  rememberMe: boolean;
}
