import { create } from 'zustand';
import { ISignUpForm } from '@/types/auth.types';

interface SignUpStore {
  form: ISignUpForm;
  step: number;
  setForm: (data: Partial<ISignUpForm>) => void;
  setStep: (num: number) => void;
  reset: () => void;
}

const initialForm: ISignUpForm = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
  birth: '',
  gender: '',
  adress: '',
  joinCategory: [],
  wantCategory: [],
};
export const useSignUpStore = create<SignUpStore>((set) => ({
  form: initialForm,
  step: 1,
  setForm: (data) => set((state) => ({ form: { ...state.form, ...data } })),
  setStep: (num) => set({ step: num }),
  reset: () => set({ form: initialForm, step: 1 }),
}));
