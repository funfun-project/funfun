'use client';
import { cn } from '@/libs/utils/twMerge';
import type { ResetPasswordForm, CommitFieldFn, FieldType } from '@/libs/utils/resetPassword';
import { useState } from 'react';
import PasswordInput from '@/common/input/PasswordInput';

type Props = {
  form: ResetPasswordForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof ResetPasswordForm>(field: K, value: ResetPasswordForm[K]) => void;
  commitField: CommitFieldFn;
  nextStep: () => void;
  canNext: boolean;
};

export default function Step2({ form, errors, setField, commitField, nextStep, canNext }: Props) {
  const [step, setStep] = useState(false);

  const onSubmit = () => {};

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h1 className="text-h2">비밀번호를 변경해 주세요</h1>
        </div>

        <form action="">
          <div>
            <PasswordInput
              value={form.password == null ? '' : String(form.password)}
              placeholder="변경 하실 비밀번호를 입력해 주세요."
              error={errors.password ?? null}
              onChange={(v) => setField('password', v)}
              onBlur={() => {
                const stepResult: boolean = commitField('password', form.password);
                if (stepResult) setStep(true);
              }}
            />
          </div>
          {step && (
            <div className="mt-2.5">
              <PasswordInput
                value={form.passwordVerification == null ? '' : String(form.passwordVerification)}
                placeholder="비밀번호를 확인해 주세요."
                error={errors.passwordVerification ?? null}
                onChange={(v) => setField('passwordVerification', v)}
                onBlur={() => void commitField('passwordVerification', form.passwordVerification)}
              />
            </div>
          )}
        </form>
      </div>

      <div>
        {step && (
          <button
            className={cn(
              'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
              canNext && 'bg-main text-text-default',
            )}
            disabled={!canNext}
            onClick={nextStep}
          >
            비밀번호 변경
          </button>
        )}
      </div>
    </>
  );
}
