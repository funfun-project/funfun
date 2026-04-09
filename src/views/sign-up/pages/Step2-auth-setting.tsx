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

export default function Step2AuthSetting({ form, errors, setField, commitField, nextStep }: Props) {
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
      value: string | null;
    }
  > = {
    1: {
      title: '닉네임 설정',
      desc: '사용하실 닉네임을 설정해 주세요.',
      buttonText: '중복 확인',
      field: 'nickname',
      value: form.nickname,
    },
    2: {
      title: '비밀번호 설정',
      desc: '사용할 비밀번호를 입력해주세요.',
      buttonText: '다음',
      field: 'password',
      value: form.password,
    },
    3: {
      title: '비밀번호 확인',
      desc: '비밀번호를 확인해 주세요.',
      buttonText: '다음',
      field: 'passwordVerification', // SignUpForm에 해당 필드가 있다고 가정
      value: form.passwordVerification,
    },
    4: {
      title: '비밀번호 확인',
      desc: '비밀번호를 확인해 주세요.',
      buttonText: '완료',
      field: 'passwordVerification',
      value: form.passwordVerification,
    },
  };

  const config = STEP_CONFIG[currentStep];

  // 다음 버튼 핸들러
  const handleNext = async () => {
    const isValid = await commitField(config!.field, config!.value);

    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else {
        console.log('동작');
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
            value={String(form.nickname ?? '')}
            placeholder="닉네임을 입력해 주세요."
            disabled={currentStep > 1}
            error={errors.nickname ?? null}
            onChange={(v) => setField('nickname', v)}
          />

          {/* Step 2: 인증번호 */}
          {currentStep >= 2 && (
            <TextInput
              id="emailVerification"
              className="inputAnimation"
              value={String(form.password ?? '')}
              placeholder="16자 이내의 영소문자, 숫자, 특수문자를 사용해 주세요."
              disabled={currentStep > 2}
              error={errors.password ?? null}
              onChange={(v) => setField('password', v)}
            />
          )}

          {/* Step 4: 비밀번호 확인 */}
          {currentStep >= 3 && (
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
          onClick={() => void handleNext()}
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
