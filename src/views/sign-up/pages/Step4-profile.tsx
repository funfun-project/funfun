'use client';
import { cn } from '@/libs/utils/twMerge';
import type { SignUpForm, CommitFieldFn, FieldType } from '@/libs/utils/signUp';
import TextInput from '@/common/input/TextInput';
import SelectInput from '@/common/input/select/MultuSelectInput';
import { gatheringCategoryList, eventCategoryList } from '../data/categoryList';
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
      value: string | null;
    }
  > = {
    1: {
      title: '모임 카테고리 설정',
      desc: '선호하는 모임 종류를 선택해 주세요.',
      buttonText: '다음',
      field: 'gatheringCategory',
      value: form.gatheringCategory,
    },
    2: {
      title: '행사 카테고리 설정',
      desc: '선호하는 행사 종류를 선택해 주세요.',
      buttonText: '다음',
      field: 'eventCategory',
      value: form.eventCategory,
    },
    3: {
      title: '행사 카테고리 설정',
      desc: '선호하는 행사 종류를 선택해 주세요.',
      buttonText: '회원 가입 완료',
      field: 'eventCategory',
      value: form.eventCategory,
    },
  };

  const config = STEP_CONFIG[currentStep];

  // 다음 버튼 핸들러
  const handleNext = async () => {
    // 현재 단계의 필드 검증
    const isValid = await commitField(config!.field, config!.value);

    if (isValid) {
      if (currentStep < 3) {
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
          <SelectInput
            value={String(form.gatheringCategory ?? '')}
            placeholder="1~3 가지의 카테고리를 선택해 주세요."
            error={errors.gatheringCategory ?? null}
            items={gatheringCategoryList}
            onSelect={(v) => {
              setField('gatheringCategory', v);
              void commitField('gatheringCategory', v);
            }}
          />

          {/* Step 2: 인증번호 */}
          {currentStep >= 2 && (
            <SelectInput
              value={String(form.eventCategory ?? '')}
              placeholder="1~3 가지의 카테고리를 선택해 주세요."
              error={errors.eventCategory ?? null}
              items={eventCategoryList}
              onSelect={(v) => {
                setField('eventCategory', v);
                void commitField('eventCategory', v);
              }}
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
