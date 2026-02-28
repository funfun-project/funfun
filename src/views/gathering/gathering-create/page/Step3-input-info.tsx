'use client';

import { Plus } from 'lucide-react';
import SelectImage from '../../../../common/selectImage/SelectImage';
import { cn } from '@/libs/utils/twMerge';
import type { CreateGatheringForm } from '../GatheringCreate'; // 경로 맞춰줘
import type { CommitFieldFn, FieldType } from '@/libs/utils/createGathering';
import Textarea from '@/common/Textarea';

type Props = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => void;
  // commitField: (field: FieldType, value: File | string) => Promise<boolean>; 로 변경
  commitField: CommitFieldFn;
  nextStep: () => void;
  prevStep?: () => void;

  // ✅ “대표 사진 영역” 말고도 필수 공통 컴포넌트가 있다면
  // 그 값도 form에 있어야 게이트를 걸 수 있어.
  // 예: requiredX?: boolean; ... 이런 식으로 props로 받거나 form 필드로 넣기
};

export default function Step3InputInfo({
  form,
  errors,
  setField,
  commitField,
  nextStep,
  prevStep,
}: Props) {
  const dateText = form.groupDate ? form.groupDate : '—';
  const duringText = form.during ? `${form.during}시간` : '—';
  const maxPeopleText = form.maxPeople ? `${form.maxPeople}명` : '—';

  // ✅ Step3 필수 조건: 대표 이미지
  // (추가 필수 컴포넌트가 있으면 여기 AND로 붙이면 됨)
  const canNext = Boolean(form.image && !errors.image);

  const handleImageChange = async (file: File | null) => {
    // ✅ 타입 가드: null이면 저장만(또는 에러로) 처리
    setField('image', file);

    if (!file) {
      // 대표 이미지 필수라면 null일 때도 commit해서 에러 띄우는 게 UX 좋음
      await commitField('image', null);
      return;
    }

    await commitField('image', file);
  };

  const handleNext = async () => {
    // ✅ 타입 가드: 이미지가 없으면 바로 검증 트리거하고 중단
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
            <p className="text-white">{dateText}</p>
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
        {/* ✅ 대표 이미지 (필수) */}
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
          {prevStep && (
            <button
              type="button"
              className="bg-bg-button text-text-default mt-2.5 w-full rounded-[3px] py-3.5"
              onClick={prevStep}
            >
              이전
            </button>
          )}

          <button
            type="button"
            className={cn(
              'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
              canNext && 'bg-main text-text-default',
            )}
            disabled={!canNext}
            onClick={() => void handleNext()}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
