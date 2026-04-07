'use client';

import { Plus } from 'lucide-react';
import SelectImage from '../../../../common/selectImage/SelectImage';
import { cn } from '@/libs/utils/twMerge';
import type { CreateGatheringForm } from '@/libs/utils/createGathering';
import type { CommitFieldFn, FieldType } from '@/libs/utils/createGathering';
import Textarea from '@/common/Textarea';
import { dateToString } from '@/libs/utils/wheelDate';

type Props = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => void;
  commitField: CommitFieldFn;
  nextStep: () => void;
  prevStep?: () => void;
};

export default function Step3InputInfo({
  form,
  errors,
  setField,
  commitField,
  nextStep,
  prevStep,
}: Props) {
  const dateText = form.groupDate && form.groupDate;
  const duringText = form.during ? `${form.during}시간` : '—';
  const maxPeopleText = form.maxPeople ? `${form.maxPeople}명` : '—';

  const canNext = Boolean(form.image && !errors.image);

  const handleImageChange = async (file: File | null) => {
    setField('image', file);

    if (!file) {
      await commitField('image', null);
      return;
    }

    await commitField('image', file);
  };

  const handleNext = async () => {
    if (!form.image) {
      await commitField('image', null);
      return;
    }

    const ok = await commitField('image', form.image);
    if (!ok) return;

    nextStep();
  };
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="p-4 pb-12.5 font-light">
        <h2 className="text-h2 mb-7.5 font-semibold text-white">{form.title || '제목 미입력'}</h2>

        <div className="flex flex-col gap-2.5">
          <div className="text-body2 flex gap-5">
            <span className="text-text-support">위치</span>
            <p className="text-white">{form.address || '—'}</p>
          </div>

          <div className="text-body2 flex gap-5">
            <span className="text-text-support">날짜</span>
            <p className="text-white">{dateToString(dateText)}</p>
          </div>

          <div className="text-body2 flex gap-5">
            <span className="text-text-support">시간</span>
            <p className="text-white">{duringText}</p>
          </div>

          <div className="text-body2 flex gap-5">
            <span className="text-text-support">인원</span>
            <p className="text-white">{maxPeopleText}</p>
          </div>

          <div className="text-body2 flex gap-5">
            <span className="text-text-support">분류</span>
            <p className="text-white">{form.category || '—'}</p>
          </div>
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="bg-bg-board flex grow-1 flex-col gap-7.5 px-4 pt-10 pb-5">
        <div>
          <SelectImage
            value={form.image}
            onChange={(file) => {
              void handleImageChange(file);
            }}
            error={errors.image ?? null}
          />
        </div>
        <div>
          <Textarea
            id="inquiry"
            value={form.explain}
            placeholder="간단한 모임글을 작성해주세요,"
            error={errors.explain ?? null}
            onChange={(v) => setField('explain', v)}
            onBlur={() => void commitField('inquiry', form.explain)}
            className="h-40 grow-0"
          />
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
            {canNext ? '완료' : '이전'}
          </button>
        </div>
      </div>
    </div>
  );
}
