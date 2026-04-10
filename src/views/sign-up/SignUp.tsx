'use client';

import { useCallback, useMemo, useReducer, useState } from 'react';
import StepProgressBar from '@/common/StepProgressBar';
import Step1 from './pages/Step1-email';
import Step2 from './pages/Step2-auth-setting';
import Step3 from './pages/Step3-category';
import Step4 from './pages/Step4-profile';
import { cn } from '@/libs/utils/twMerge';
import { getGeocode } from '@/libs/utils/naverMap';
import {
  type CommitFieldFn,
  type FieldType,
  type ValidationArg,
  type SignUpForm,
  initialForm,
  validationInput,
} from '@/libs/utils/signUp';

type State = {
  step: number;
  form: SignUpForm;
  errors: Partial<Record<FieldType, string>>;

  isAddressLoading: boolean;
  addressError: string | null;
  addressSuccess: boolean;
};

const initialState: State = {
  step: 1,
  form: initialForm,
  errors: {},

  isAddressLoading: false,
  addressError: null,
  addressSuccess: false,
};

type Action =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_FORM'; patch: Partial<SignUpForm> }
  | { type: 'SET_ERROR'; field: FieldType; message: string | null }
  | { type: 'SET_ADDRESS_STATUS'; loading: boolean; error: string | null; success: boolean }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'SET_FORM':
      return { ...state, form: { ...state.form, ...action.patch } };

    case 'SET_ERROR': {
      const next = { ...state.errors };
      if (!action.message) delete next[action.field];
      else next[action.field] = action.message;
      return { ...state, errors: next };
    }

    case 'SET_ADDRESS_STATUS':
      return {
        ...state,
        isAddressLoading: action.loading,
        addressError: action.error,
        addressSuccess: action.success,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, form, errors, isAddressLoading, addressError, addressSuccess } = state;

  const setStep = useCallback((next: number) => dispatch({ type: 'SET_STEP', step: next }), []);
  const nextStep = useCallback(() => setStep(step + 1), [setStep, step]);

  // form 필드 업데이트 (로컬 state가 source of truth)
  const setField = useCallback(<K extends keyof SignUpForm>(field: K, value: SignUpForm[K]) => {
    dispatch({ type: 'SET_FORM', patch: { [field]: value } as Partial<SignUpForm> });
  }, []);

  // 주소 처리(지오코딩)
  const resolveAddress = useCallback(
    async (address: string): Promise<boolean> => {
      const trimmed = address.trim();

      if (!trimmed) {
        dispatch({
          type: 'SET_ADDRESS_STATUS',
          loading: false,
          error: '주소를 입력해주세요.',
          success: false,
        });
        dispatch({ type: 'SET_FORM', patch: { address: '', latitude: 0, longitude: 0 } });
        return false;
      }

      dispatch({ type: 'SET_ADDRESS_STATUS', loading: true, error: null, success: false });
      dispatch({ type: 'SET_FORM', patch: { address: trimmed } });

      try {
        const geo = await getGeocode(trimmed);
        const roadAddress = geo.addresses[0]?.roadAddress;
        const long = Number(geo.addresses[0]?.x);
        const lat = Number(geo.addresses[0]?.y);

        if (!geo) {
          dispatch({
            type: 'SET_ADDRESS_STATUS',
            loading: false,
            error: '주소를 찾을 수 없어요. 다시 확인해주세요.',
            success: false,
          });
          dispatch({ type: 'SET_FORM', patch: { latitude: 0, longitude: 0 } });
          return false;
        }

        dispatch({ type: 'SET_FORM', patch: { address: roadAddress } });
        dispatch({ type: 'SET_FORM', patch: { latitude: lat, longitude: long } });
        return true;
      } catch (error) {
        console.log('실패');
        if (error instanceof Error) {
          console.log(error);
        }
        dispatch({
          type: 'SET_ADDRESS_STATUS',
          loading: false,
          error: '주소 확인 중 오류가 발생했어요.',
          success: false,
        });
        dispatch({ type: 'SET_FORM', patch: { latitude: 0, longitude: 0 } });
        return false;
      } finally {
        dispatch({
          type: 'SET_ADDRESS_STATUS',
          loading: false,
          error: state.addressError,
          success: form.address !== '' ? true : false,
        });
      }
    },
    [state.addressError, form.address],
  );

  const commitField: CommitFieldFn = useCallback(
    async (fieldType, value) => {
      const msg = validationInput({ type: fieldType, value } as ValidationArg);
      dispatch({ type: 'SET_ERROR', field: fieldType, message: msg });

      // if (msg) {
      //   if (fieldType === 'title') {
      //     dispatch({ type: 'SET_FORM', patch: { title: null } });
      //   }

      //   if (fieldType === 'maxPeople') {
      //     dispatch({ type: 'SET_FORM', patch: { maxPeople: null } });
      //   }

      //   if (fieldType === 'during') {
      //     dispatch({ type: 'SET_FORM', patch: { during: null } });
      //   }

      //   if (fieldType === 'groupDate') {
      //     dispatch({ type: 'SET_FORM', patch: { groupDate: null } });
      //   }

      //   return false;
      // }

      if (fieldType === 'address') {
        return await resolveAddress(value as string);
      }

      return true;
    },
    [resolveAddress],
  );

  const canNextStep = useMemo(
    () => Boolean(form.email && form.emailVerification),
    [form.email, form.emailVerification],
  );

  return (
    <div className="bg-bg-main relative h-dvh w-full">
      <div className="flex h-screen w-full flex-col bg-black px-4 pt-20 pb-8">
        <div>
          <StepProgressBar step={step} total={4} activeColor="#FF5126" inactiveColor="#3A3A3A" />
        </div>

        {step === 1 && (
          <Step1
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
            canNext={canNextStep}
          />
        )}

        {step === 2 && (
          <Step2
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
          />
        )}

        {step === 3 && (
          <Step3
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            isAddressLoading={isAddressLoading}
            addressError={addressError}
            addressSuccess={addressSuccess}
            nextStep={nextStep}
          />
        )}

        {step === 4 && (
          <Step4
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
          />
        )}
      </div>
    </div>
  );
}
