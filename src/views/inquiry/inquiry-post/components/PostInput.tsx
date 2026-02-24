'use client';
import SelectImage from '@/common/selectImage/SelectImage';
import Input from '@/common/Input';
import type { CreateGatheringForm } from '../InquiryPost';
import type { FieldType, FieldValueMap } from '@/libs/utils/createGathering';
import { cn } from '@/libs/utils/twMerge';
import Textarea from '@/common/Textarea';

type CommitFieldFn = <K extends FieldType>(fieldType: K, value: FieldValueMap[K]) => boolean;

type Props = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;
  setField: <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => void;
  commitField: CommitFieldFn;
  canNext: boolean;
};

export default function InquiryPost({ form, errors, setField, commitField, canNext }: Props) {
  const handleImageChange = (file: File | null) => {
    // ✅ 타입 가드: null이면 저장만(또는 에러로) 처리
    setField('image', file);

    if (!file) {
      // 대표 이미지 필수라면 null일 때도 commit해서 에러 띄우는 게 UX 좋음
      commitField('image', null);
      return;
    }

    commitField('image', file);
  };
  return (
    <>
      <div className="flex h-full flex-col">
        {/* 헤더 영역 */}
        <div className="h-14 w-full bg-amber-100"></div>
        {/* 컨텐츠 영역 */}
        <div className="flex grow-1 flex-col gap-2.25">
          <div>
            <label htmlFor="title" className="text-main mb-1.25">
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
          <div>
            <label htmlFor="category" className="text-main my-1.25">
              카테고리
            </label>
            <Input
              id="category"
              mode="select"
              value={form.category}
              placeholder="카테고리를 선택해 주세요."
              error={errors.category ?? null}
              items={['문의', '신고']}
              onSelect={(v) => setField('category', v)}
              onBlur={() => void commitField('category', form.category)}
            />
          </div>
          <div>
            <label className="text-main mb-1.25 block">대표 사진</label>
            <SelectImage
              mode="inquiry"
              value={form.image}
              onChange={(file) => {
                void handleImageChange(file);
              }}
              error={errors.image ?? null}
              className="rounded-[3px]"
            />
          </div>
          <div className="flex grow-1 flex-col">
            <label htmlFor="inquiry" className="text-main mb-1.25 block">
              내용 작성
            </label>
            <Textarea
              id="inquiry"
              value={form.inquiry}
              placeholder="문의글을 작성해 주세요."
              error={errors.inquiry ?? null}
              onChange={(v) => setField('inquiry', v)}
              onBlur={() => void commitField('inquiry', form.inquiry)}
              className="rounded-[3px]"
            />
          </div>
        </div>
        {/* 다음 버튼 */}
        <div className="mt-7.5 flex">
          <button
            type="button"
            className={cn(
              'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
              canNext && 'bg-main text-text-default',
            )}
            disabled={!canNext}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
