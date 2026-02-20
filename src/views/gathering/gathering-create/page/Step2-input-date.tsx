// 'use client';

// import { useState, Dispatch, SetStateAction } from 'react';
// import { useCreateGatheringStore } from '@/stores/useCreateGatheringStore';

// import Input from '../../../../common/Input';
// import { cn } from '@/libs/utils/twMerge';

// type Props = {
//   setStep: Dispatch<SetStateAction<number>>;
// };

// export default function Step2InputDate({ setStep }: Props) {
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const form = useCreateGatheringStore((state) => state.form);

//   return (
//     <>
//       <div className="flex-1 space-y-3">
//         <div className="text-white">
//           <h1 className="text-h2">모임의 날짜를 정해주세요</h1>
//         </div>
//         <div>
//           <h3 className="text-main mb-2.5">모임 위치</h3>
//           <Input type="address" placeholder="모임 위치를 작성해 주세요." inputType="text" />
//         </div>
//         <div className="mt-2.5">
//           <h3 className="text-main mb-2.5">모임 날짜</h3>
//           <Input type="date" placeholder="모임 날짜를 선택해 주세요." inputType="text" />
//         </div>
//         <div className="mt-2.5">
//           <h3 className="text-main mb-2.5">모임 인원</h3>
//           <Input type="maxPeople" placeholder="최대 인원을 입력해 주세요." inputType="text" />
//         </div>
//         <div className="mt-2.5">
//           <h3 className="text-main mb-2.5">모임 시간</h3>
//           <Input type="during" placeholder="소요 시간을 입력해 주세요." inputType="text" />
//         </div>
//       </div>
//       <div>
//         <button
//           className={cn(
//             'bg-bg-button text-text-disabled mt-2.5 w-full rounded-[3px] py-3.5',
//             form.address &&
//               form.groupDate &&
//               form.maxPeople &&
//               form.during &&
//               'bg-main text-text-default',
//           )}
//           disabled={!(form.address && form.groupDate && form.maxPeople && form.during)}
//           onClick={() => setStep((prev) => (prev += 1))}
//         >
//           다음
//         </button>
//       </div>
//     </>
//   );
// }

'use client';

import { cn } from '@/libs/utils/twMerge';
import Input from '../../../../common/Input';
import type { CreateGatheringForm } from '../GatheringCreate'; // 경로 맞춰줘
import type { FieldType, CommitFieldFn } from '@/libs/utils/createGathering'; // CommitFieldFn 쓰면 더 깔끔

type Props = {
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;

  setField: <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => void;
  commitField: CommitFieldFn;

  nextStep: () => void;
  prevStep?: () => void;

  // ✅ 여기 추가 (에러 해결 포인트)
  isAddressLoading: boolean;
  addressError: string | null;
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
}: Props) {
  // Step2 게이트(필요에 맞게 수정 가능)
  const canNext = Boolean(
    form.address.trim() &&
      form.groupDate &&
      Number(form.maxPeople) > 0 &&
      Number(form.during) > 0 &&
      !errors.address &&
      !errors.date &&
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
          <label htmlFor="gathering-address" className="text-main mb-2.5 block">
            모임 위치
          </label>
          <Input
            id="gathering-address"
            value={form.address}
            placeholder="모임 위치를 작성해 주세요."
            // 주소 전용 에러: validation 에러 + geocode 에러 둘 다 표시하고 싶으면 우선순위 정하기
            error={addressError ?? errors.address ?? null}
            onChange={(v) => setField('address', v)}
            onBlur={() => void commitField('address', form.address)}
          />
          {isAddressLoading && (
            <p className="mt-1 text-sm text-text-support">주소를 확인 중입니다...</p>
          )}
        </div>

        {/* 날짜 */}
        <div className="mt-2.5">
          <label htmlFor="gathering-date" className="text-main mb-2.5 block">
            모임 날짜
          </label>
          <Input
            id="gathering-date"
            value={form.groupDate}
            placeholder="모임 날짜를 선택해 주세요."
            error={errors.date ?? null}
            onChange={(v) => setField('groupDate', v)}
            onBlur={() => void commitField('date', form.groupDate)}
          />
        </div>

        {/* 인원 */}
        <div className="mt-2.5">
          <label htmlFor="gathering-maxPeople" className="text-main mb-2.5 block">
            모임 인원
          </label>
          <Input
            id="gathering-maxPeople"
            value={String(form.maxPeople ?? '')}
            placeholder="최대 인원을 입력해 주세요."
            error={errors.maxPeople ?? null}
            onChange={(v) => setField('maxPeople', Number(v))}
            onBlur={() => void commitField('maxPeople', form.maxPeople)}
          />
        </div>

        {/* 시간 */}
        <div className="mt-2.5">
          <label htmlFor="gathering-during" className="text-main mb-2.5 block">
            모임 시간
          </label>
          <Input
            id="gathering-during"
            value={String(form.during ?? '')}
            placeholder="소요 시간을 입력해 주세요."
            error={errors.during ?? null}
            onChange={(v) => setField('during', Number(v))}
            onBlur={() => void commitField('during', form.during)}
          />
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
          onClick={nextStep}
        >
          다음
        </button>
      </div>
    </>
  );
}