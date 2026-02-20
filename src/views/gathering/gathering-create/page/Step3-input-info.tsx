// 'use client';

// import { Plus } from 'lucide-react';
// import { Dispatch, SetStateAction } from 'react';
// import SelectImage from '../../../../common/selectImage/SelectImage';

// type Props = {
//   setStep: Dispatch<SetStateAction<number>>;
// };

// export default function Step3InputInfo({ setStep }: Props) {
//   return (
//     <>
//       <div className="flex h-screen w-full flex-col">
//         <div className="p-4 pb-12.5 font-light">
//           <h2 className="text-h2 mb-7.5 font-semibold text-white">title</h2>
//           <div className="flex flex-col gap-2.5">
//             <div className="text-body2 flex gap-5">
//               <h3 className="text-text-support">위치</h3>
//               <p className="text-white">대처 텍스트 입니다</p>
//             </div>
//             <div className="text-body2 flex gap-5">
//               <h3 className="text-text-support">날씨</h3>
//               <p className="text-white">대처 텍스트 입니다</p>
//             </div>
//             <div className="text-body2 flex gap-5">
//               <h3 className="text-text-support">시간</h3>
//               <p className="text-white">대처 텍스트 입니다</p>
//             </div>
//             <div className="text-body2 flex gap-5">
//               <h3 className="text-text-support">인원</h3>
//               <p className="text-white">대처 텍스트 입니다</p>
//             </div>
//             <div className="text-body2 flex gap-5">
//               <h3 className="text-text-support">분류</h3>
//               <p className="text-white">대처 텍스트 입니다</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-bg-board flex grow-1 flex-col gap-7.5 px-4 pt-10 pb-5">
//           <SelectImage />
//           <div className="bg-bg-input cursor-pointer rounded-[20px] border-1 border-[#4e4e4e] py-11.5">
//             <div className="flex flex-col items-center justify-center gap-2.5">
//               <p className="text-[#D6D6D6]">대표 사진을 추가해 주세요</p>
//               <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
//                 <Plus color="#FF5126" size={28} />
//               </div>
//             </div>
//           </div>
//           <button className="bg-main text-text-default mt-2.5 w-full rounded-[3px] py-3.5">
//             다음
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { Plus } from 'lucide-react';
import SelectImage from '../../../../common/selectImage/SelectImage';
import { cn } from '@/libs/utils/twMerge';
import type { CreateGatheringForm } from '../GatheringCreate'; // 경로 맞춰줘
import type { CommitFieldFn, FieldType } from '@/libs/utils/createGathering';

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
      {/* 요약 영역 */}
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
          <label className="text-main mb-2.5 block">대표 사진</label>
          <SelectImage
            value={form.image}
            onChange={(file) => {
              void handleImageChange(file);
            }}
            error={errors.image ?? null}
          />
        </div>

        {/* ✅ “필수 공통 컴포넌트 자리”
            지금은 영역만 있어도 되는데, 나중에 진짜 필수 입력이 들어오면
            form 필드 + validation + commit + canNext 조건에 포함시키면 됨. */}
        <div className="bg-bg-input cursor-pointer rounded-[20px] border-1 border-[#4e4e4e] py-11.5">
          <div className="flex flex-col items-center justify-center gap-2.5">
            <p className="text-[#D6D6D6]">필수 정보를 추가해 주세요</p>
            <div className="rounded-full bg-[rgba(255,81,38,.3)] p-1.5">
              <Plus color="#FF5126" size={28} />
            </div>
          </div>
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
