'use client';
import { cn } from '@/libs/utils/twMerge';
import type { SignUpForm, CommitFieldFn, FieldType } from '@/libs/utils/signUp';
import TextInput from '@/common/input/TextInput';
import { useState } from 'react';

type Props = {
  form: SignUpForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof SignUpForm>(field: K, value: SignUpForm[K]) => void;
  commitField: CommitFieldFn;
  nextStep?: () => void; // 전체 퍼널의 다음 단계로 이동 (컴포넌트 교체용)
};

export default function Step4Profile({ form, errors, setField, commitField, nextStep }: Props) {
  // 1: 이메일 입력, 2: 인증번호, 3: 비밀번호 설정, 4: 비밀번호 확인
  const [currentStep, setCurrentStep] = useState(1);

  // --- 단계별 UI 및 로직 설정 ---
  const STEP_CONFIG: Record<
    number,
    {
      title: string;
      desc: string;
      buttonText: string;
      field: FieldType;
      value: string | null | string[];
    }
  > = {
    1: {
      title: '이메일 인증',
      desc: '메일을 입력하면 인증번호가 발송돼요.',
      buttonText: '인증 메일 발송',
      field: 'nickname',
      value: form.nickname,
    },
    2: {
      title: '새 비밀번호 설정',
      desc: '사용할 비밀번호를 입력해주세요.',
      buttonText: '다음',
      field: 'password',
      value: form.password,
    },
    3: {
      title: '새 비밀번호 설정',
      desc: '사용할 비밀번호를 입력해주세요.',
      buttonText: '다음',
      field: 'passwordVerification', // SignUpForm에 해당 필드가 있다고 가정
      value: form.passwordVerification,
    },
  };

  const config = STEP_CONFIG[currentStep];

  // 다음 버튼 핸들러
  const handleNext = async () => {
    // 현재 단계의 필드 검증
    const isValid = await commitField(config!.field, config!.value);

    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // 모든 로컬 단계 완료 시 부모 퍼널의 다음 단계로
        nextStep?.();
      }
    }
  };

  // 버튼 활성화 여부 (현재 단계의 값이 비어있지 않은지 확인)
  const isButtonDisabled = !config?.value || String(config?.value).trim() === '';

  return (
    <>
      <div className="flex-1 space-y-3">
        {/* 헤더 섹션 */}
        <div className="mb-9 text-white">
          <h1 className="text-h2 mb-[5px]">{config?.title}</h1>
          <p className="text-body4 text-[#B0B0B0]">{config?.desc}</p>
        </div>

        {/* 입력 섹션 */}
        <div className="space-y-4">
          {/* Step 1: 이메일 (2단계부터는 비활성화된 상태로 계속 노출) */}
          <TextInput
            id="email"
            value={String(form.email ?? '')}
            placeholder="이메일을 입력해 주세요."
            // disabled={currentStep > 1}
            error={errors.email ?? null}
            onChange={(v) => setField('email', v)}
          />

          {/* Step 2: 인증번호 */}
          {currentStep >= 2 && (
            <TextInput
              id="emailVerification"
              className="inputAnimation"
              value={String(form.emailVerification ?? '')}
              placeholder="인증번호 6자리를 입력해 주세요."
              //   disabled={currentStep > 2}
              error={errors.emailVerification ?? null}
              onChange={(v) => setField('emailVerification', v)}
            />
          )}

          {/* Step 3: 비밀번호 */}
          {currentStep >= 3 && (
            <TextInput
              id="password"
              //   type="password"
              className="inputAnimation"
              value={String(form.password ?? '')}
              placeholder="새 비밀번호를 입력해 주세요."
              //   disabled={currentStep > 3}
              error={errors.password ?? null}
              onChange={(v) => setField('password', v)}
            />
          )}

          {/* Step 4: 비밀번호 확인 */}
          {currentStep >= 4 && (
            <TextInput
              id="passwordVerification"
              //   type="password"
              className="inputAnimation"
              value={String(form.passwordVerification ?? '')}
              placeholder="비밀번호를 다시 입력해 주세요."
              error={errors.passwordVerification ?? null}
              onChange={(v) => setField('passwordVerification', v)}
            />
          )}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="mt-auto">
        <button
          type="button"
          onClick={void handleNext}
          disabled={isButtonDisabled}
          className={cn(
            'bg-bg-button text-text-disabled w-full rounded-[3px] py-3.5 transition-all',
            !isButtonDisabled && 'bg-main text-text-default active:scale-[0.98]',
          )}
        >
          {config?.buttonText}
        </button>
      </div>
    </>
  );
}
