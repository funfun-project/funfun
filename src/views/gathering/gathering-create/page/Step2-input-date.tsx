'use client';

import { cn } from '@/libs/utils/twMerge';
import TextInput from '@/common/input/TextInput';
import type { CreateGatheringForm } from '@/libs/utils/createGathering';
import type { FieldType, CommitFieldFn } from '@/libs/utils/createGathering';
import { Dispatch, SetStateAction } from 'react';
import DateInput from '@/common/input/DateInput';

type Props = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;

  setField: <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => void;
  commitField: CommitFieldFn;

  nextStep: () => void;
  prevStep?: () => void;

  isAddressLoading: boolean;
  addressError: string | null;
  addressSuccess: boolean;
  setIsPickerOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Step2InputDate({
  form,
  errors,
  setField,
  commitField,
  nextStep,
  prevStep,
  isAddressLoading,
  addressError,
  addressSuccess,
  setIsPickerOpen,
}: Props) {
  // Step2 게이트
  const canNext = Boolean(
    form.address.trim() &&
    form.groupDate &&
    Number(form.maxPeople) > 0 &&
    Number(form.during) > 0 &&
    !errors.address &&
    !errors.groupDate &&
    !errors.maxPeople &&
    !errors.during &&
    !addressError &&
    !isAddressLoading,
  );

  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h1 className="text-h2">모임의 날짜를 정해주세요</h1>
        </div>

        {/* 주소 */}
        <div>
          <label htmlFor="gathering-date" className="text-main mb-1.25 block">
            모임 날짜
          </label>
          <DateInput
            id="gathering-date"
            value={form.groupDate}
            placeholder="모임 날짜를 선택해 주세요."
            error={errors.groupDate ?? null}
            onClick={() => setIsPickerOpen(true)}
          />
        </div>

        {/* 날짜 */}
        <div className="mt-2.5">
          <label htmlFor="gathering-address" className="text-main mb-1.25 block">
            모임 위치
          </label>
          <TextInput
            id="gathering-address"
            mode="address"
            value={form.address}
            placeholder="모임 위치를 작성해 주세요."
            error={addressError ?? errors.address ?? null}
            onChange={(v) => setField('address', v)}
            onBlur={() => void commitField('address', form.address)}
            addressSuccess={addressSuccess}
          />
        </div>

        {/* 인원 */}
        <div className="mt-2.5">
          <label htmlFor="gathering-maxPeople" className="text-main mb-1.25 block">
            모임 인원
          </label>
          <TextInput
            id="gathering-maxPeople"
            value={form.maxPeople == null ? '' : String(form.maxPeople)}
            placeholder="최대 인원을 입력해 주세요."
            error={errors.maxPeople ?? null}
            onChange={(v) => setField('maxPeople', String(v))}
            onBlur={() => void commitField('maxPeople', form.maxPeople)}
          />
        </div>

        {/* 시간 */}
        <div className="mt-2.5">
          <label htmlFor="gathering-during" className="text-main mb-1.25 block">
            모임 시간
          </label>
          <TextInput
            id="gathering-during"
            value={form.during == null ? '' : String(form.during)}
            placeholder="모임 시간을 입력해 주세요."
            error={errors.during ?? null}
            onChange={(v) => setField('during', String(v))}
            onBlur={() => void commitField('during', form.during)}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        <button
          type="button"
          className={cn(
            'bg-main text-text-default mt-2.5 w-full rounded-[3px] py-3.5',
            canNext && 'bg-main text-text-default',
          )}
          onClick={() => {
            if (canNext) {
              nextStep();
              return;
            }
            if (prevStep) prevStep();
          }}
        >
          {canNext ? '다음' : '이전'}
        </button>
      </div>
    </>
  );
}
