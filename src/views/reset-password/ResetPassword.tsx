'use client';

import { useCallback, useMemo, useReducer } from 'react';
import StepProgressBar from '@/common/StepProgressBar';
import Step1 from './pages/Step1-email-verification';
import Step2 from './pages/Sterp2-password-verification';
import { cn } from '@/libs/utils/twMerge';
import {
  type CommitFieldFn,
  type FieldType,
  type ValidationArg,
  type ResetPasswordForm,
  initialForm,
  validationInput,
} from '@/libs/utils/resetPassword';

type State = {
  step: number;
  form: ResetPasswordForm;
  errors: Partial<Record<FieldType, string>>;

  isEmailLoading: boolean;
  emailError: string | null;
  emailSuccess: boolean;
};

const initialState: State = {
  step: 1,
  form: initialForm,
  errors: {},

  isEmailLoading: false,
  emailError: null,
  emailSuccess: false,
};

type Action =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_FORM'; patch: Partial<ResetPasswordForm> }
  | { type: 'SET_ERROR'; field: FieldType; message: string | null }
  | { type: 'SET_Email_STATUS'; loading: boolean; error: string | null; success: boolean }
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

    case 'SET_Email_STATUS':
      return {
        ...state,
        isEmailLoading: action.loading,
        emailError: action.error,
        emailSuccess: action.success,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function ResetPassword() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, form, errors } = state;

  const setStep = useCallback((next: number) => dispatch({ type: 'SET_STEP', step: next }), []);
  const nextStep = useCallback(() => setStep(step + 1), [setStep, step]);
  const prevStep = useCallback(() => setStep(Math.max(1, step - 1)), [setStep, step]);

  const setField = useCallback(
    <K extends keyof ResetPasswordForm>(field: K, value: ResetPasswordForm[K]) => {
      dispatch({ type: 'SET_FORM', patch: { [field]: value } as Partial<ResetPasswordForm> });
    },
    [],
  );

  const commitField: CommitFieldFn = useCallback((fieldType, value) => {
    const msg = validationInput({ type: fieldType, value } as ValidationArg);
    dispatch({ type: 'SET_ERROR', field: fieldType, message: msg });

    if (msg) {
      if (fieldType === 'email') {
        dispatch({ type: 'SET_FORM', patch: { email: null } });
      }

      if (fieldType === 'emailVerification') {
        dispatch({ type: 'SET_FORM', patch: { emailVerification: null } });
      }

      if (fieldType === 'password') {
        dispatch({ type: 'SET_FORM', patch: { password: null } });
      }

      if (fieldType === 'passwordVerification') {
        dispatch({ type: 'SET_FORM', patch: { passwordVerification: null } });
      }

      return false;
    }

    return true;
  }, []);

  const canNextStep1 = useMemo(
    () => Boolean(form.email && form.emailVerification),
    [form.email, form.emailVerification],
  );

  return (
    <div className="bg-bg-main relative h-dvh w-full">
      <div
        className={cn(
          'flex h-screen w-full flex-col bg-black pt-20',
          step === 3 ? 'px-none pb-none' : 'px-4 pb-8',
        )}
      >
        <div className={cn(step === 3 ? 'px-4' : 'px-0')}>
          <StepProgressBar step={step} total={2} activeColor="#FF5126" inactiveColor="#3A3A3A" />
        </div>

        {step === 1 && (
          <Step1
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
            canNext={canNextStep1}
          />
        )}

        {step === 2 && (
          <Step2
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      </div>
    </div>
  );
}
