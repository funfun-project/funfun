'use client';
import { cn } from '@/libs/utils/twMerge';
import type { SignUpForm, CommitFieldFn, FieldType } from '@/libs/utils/signUp';
import TextInput from '@/common/input/TextInput';
import SelectInput from '@/common/input/select/SelectInput';
import { useState } from 'react';

type Props = {
  form: SignUpForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof SignUpForm>(field: K, value: SignUpForm[K]) => void;
  commitField: CommitFieldFn;
  nextStep?: () => void;
  isAddressLoading: boolean;
  addressError: string | null;
  addressSuccess: boolean;
};

export default function Step3Category({
  form,
  errors,
  setField,
  commitField,
  nextStep,
  isAddressLoading,
  addressError,
  addressSuccess,
}: Props) {
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
      title: '생일 설정',
      desc: '생년월일 8자를 입력해 주세요.',
      buttonText: '다음',
      field: 'birthday',
      value: form.birthday,
    },
    2: {
      title: '성별 설정',
      desc: '성별을 골라주세요.',
      buttonText: '다음',
      field: 'gender',
      value: form.gender,
    },
    3: {
      title: '주소 설정',
      desc: '주소를 입력해주세요.',
      buttonText: '다음',
      field: 'address',
      value: form.address,
    },
    4: {
      title: '주소 설정',
      desc: '주소를 입력해주세요.',
      buttonText: '완료',
      field: 'birthday',
      value: form.birthday,
    },
  };

  const config = STEP_CONFIG[currentStep];

  // 다음 버튼 핸들러
  const handleNext = async () => {
    // 현재 단계의 필드 검증
    const isValid = await commitField(config!.field, config!.value);
    console.log(currentStep);

    if (isValid) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else {
        nextStep?.();
      }
    }
  };

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
          <TextInput
            value={String(form.birthday ?? '')}
            placeholder="YYYYMMDD 형식으로 생년월일 8자를 입력해 주세요."
            disabled={currentStep > 1}
            error={errors.birthday ?? null}
            onChange={(v) => setField('birthday', v)}
          />

          {currentStep >= 2 && (
            <SelectInput
              className="inputAnimation"
              value={form.gender}
              placeholder="성별을 선택해 주세요."
              error={errors.gender ?? null}
              items={['남성', '여성']}
              onSelect={(v) => {
                setField('gender', v);
                void commitField('gender', v);
              }}
            />
          )}

          {currentStep >= 3 && (
            <TextInput
              mode="address"
              className="inputAnimation"
              value={form.address}
              placeholder="주소를 작성해 주세요."
              error={addressError ?? errors.address ?? null}
              onChange={(v) => setField('address', v)}
              onBlur={() => void commitField('address', form.address)}
              addressSuccess={addressSuccess}
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
