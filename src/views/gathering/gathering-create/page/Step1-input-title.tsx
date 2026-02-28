'use client';
import { cn } from '@/libs/utils/twMerge';
import Input from '@/common/Input';
import { joinCategoryList } from '@/views/sign-up/data/categoryList';
import type { CreateGatheringForm } from '../GatheringCreate';
import type { CommitFieldFn, FieldType } from '@/libs/utils/createGathering';

type Props = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => void;
  commitField: CommitFieldFn;
  nextStep: () => void;
  canNext: boolean;
};

export default function Step1InputTitle({
  form,
  errors,
  setField,
  commitField,
  nextStep,
  canNext,
}: Props) {
  return (
    <>
      <div className="flex-1 space-y-3">
        <div className="text-white">
          <h1 className="text-h2">모임을 설정해 주세요</h1>
        </div>

        <div>
          <label htmlFor="title" className="text-main mb-1.25 block">
            제목
          </label>
          <Input
            id="title"
            value={form.title}
            placeholder="제목을 작성해 주세요."
            error={errors.title ?? null}
            onChange={(v) => setField('title', v)}
            onBlur={() => void commitField('title', form.title)}
          />
        </div>

        <div className="mt-2.5">
          <label htmlFor="category" className="text-main my-1.25 block">
            카테고리
          </label>
          <Input
            id="category"
            mode="select"
            value={form.category}
            placeholder="카테고리를 선택해 주세요."
            error={errors.category ?? null}
            items={joinCategoryList}
            onSelect={(v) => setField('category', v)}
            onBlur={() => void commitField('category', form.category)}
          />
        </div>
      </div>

      <div>
        <button
          className={cn(
            'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
            canNext && 'bg-main text-text-default',
          )}
          disabled={!canNext}
          onClick={nextStep}
        >
          다음
        </button>
      </div>
    </>
  );
}
