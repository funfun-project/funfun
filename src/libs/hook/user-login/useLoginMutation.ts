import { PostLogin } from '@/libs/api/sign-up/postLoginAPI';
import { useBaseMutation } from '../use-sign-up/useBaseMutation';
import { postLogin } from '@/libs/api/sign-up/getAPI';

export const usePostLogin = () => useBaseMutation(postLogin);
