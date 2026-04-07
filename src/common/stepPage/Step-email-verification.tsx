'use client';
import { cn } from '@/libs/utils/twMerge';
import type { ResetPasswordForm, CommitFieldFn, FieldType } from '@/libs/utils/resetPassword';
import TextInput from '@/common/input/TextInput';
import { useState } from 'react';

type Props = {
  form: ResetPasswordForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof ResetPasswordForm>(field: K, value: ResetPasswordForm[K]) => void;
  commitField: CommitFieldFn;
  nextStep?: () => void;
  canNext?: boolean;
};

export default function StepEmailVerification({
  form,
  errors,
  setField,
  commitField,
  nextStep,
  canNext,
}: Props) {
  const [step, setStep] = useState(false);
  const [onEmailValid, setOnEmailValid] = useState(false);

  const canSendEmail = Boolean(form.email);
  const canVerifyEmail = Boolean(form.email && form.emailVerification);

  const onSubmit = () => {
    console.log('on submit');
  };

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="mb-9 text-white">
          <h1 className="text-h2 mb-[5px]">이메일 인증을 해주세요</h1>
          <p className="text-body4 text-[#B0B0B0]">메일을 입력하면 메일이 발송 돼요</p>
        </div>

        <form action={() => onSubmit()}>
          <div>
            <TextInput
              id="email"
              value={form.email == null ? '' : String(form.email)}
              placeholder="이메일을 입력해 주세요."
              error={errors.email ?? null}
              onChange={(v) => setField('email', v)}
              onBlur={() => void commitField('email', form.email)}
            />
          </div>
          {step && (
            <div className="mt-2.5">
              <TextInput
                id="password"
                value={form.emailVerification == null ? '' : String(form.emailVerification)}
                placeholder="이메일을 입력해 주세요."
                error={errors.emailVerification ?? null}
                onChange={(v) => setField('emailVerification', v)}
                onBlur={() => void commitField('emailVerification', form.emailVerification)}
              />
            </div>
          )}
        </form>
      </div>

      <div>
        {step && onEmailValid ? (
          <button
            className={cn(
              'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
              canVerifyEmail && 'bg-main text-text-default',
            )}
            disabled={!canVerifyEmail}
            onClick={nextStep}
          >
            메일 인증
          </button>
        ) : (
          <button
            className={cn(
              'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
              canSendEmail && 'bg-main text-text-default',
            )}
            disabled={!canSendEmail && canNext}
            onClick={() => {
              const ok = commitField('email', form.email);
              if (!ok) return;

              setStep(true);
              setOnEmailValid(true);
            }}
          >
            인증 메일 발송
          </button>
        )}
      </div>
    </>
  );
}
