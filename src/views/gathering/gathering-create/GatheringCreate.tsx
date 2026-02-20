// 'use client';
// import StepProgressBar from '@/common/StepProgressBar';
// import { useCreateGatheringStore } from '@/stores/useCreateGatheringStore';
// import Step1 from './page/Step1-input-title';
// import Step2 from './page/Step2-input-date';
// import Step3 from './page/Step3-input-info';
// import Step4 from './page/Step4-complete';
// import { useState } from 'react';
// import { cn } from '@/libs/utils/twMerge';
// export default function GatheringCreate() {
//   // const step = useCreateGatheringStore((state) => state.step);
//   const [step, setStep] = useState(1);

//   return (
//     <div className="flex justify-center bg-black">
//       <div
//         className={cn(
//           'flex h-screen w-full flex-col bg-black pt-20',
//           step === 3 ? 'px-none pb-none' : 'px-4 pb-8',
//         )}
//       >
//         {/* <h2 className="text-white text-xl flex justify-center items-center py-2">
//             회원가입
//           </h2> */}
//         <div className={cn(step === 3 ? 'px-4' : 'px-0')}>
//           <StepProgressBar step={step} total={3} activeColor="#FF5126" inactiveColor="#3A3A3A" />
//         </div>
//         {step === 1 && <Step1 setStep={setStep} />}
//         {step === 2 && <Step2 setStep={setStep} />}
//         {step === 3 && <Step3 setStep={setStep} />}
//         {step === 4 && <Step4 />}
//       </div>
//     </div>
//   );
// }

'use client';

import { useCallback, useMemo, useReducer } from 'react';
import StepProgressBar from '@/common/StepProgressBar';
import Step1 from './page/Step1-input-title';
import Step2 from './page/Step2-input-date';
import Step3 from './page/Step3-input-info';
import Step4 from './page/Step4-complete';
import { cn } from '@/libs/utils/twMerge';
import { fetchLatLngFromAddress } from '@/libs/utils/geocode'; // 네가 분리해둔 util (없으면 기존 함수 그대로 넣어도 됨)
import type { CommitFieldFn } from '@/libs/utils/createGathering';

// =======================
// 1) Form 타입 & 초기값
// =======================
export interface CreateGatheringForm {
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  category: string;
  joinCategory: string[];
  maxPeople: number;
  latitude: number;
  longitude: number;
  image: File | null;
  hashTags: string[];
  during: number;
}

const initialForm: CreateGatheringForm = {
  title: '',
  explain: '',
  simpleExplain: '',
  placeName: '',
  groupDate: '',
  address: '',
  category: '',
  joinCategory: [],
  maxPeople: 2,
  latitude: 0,
  longitude: 0,
  image: null,
  hashTags: [],
  during: 0,
};

// =======================
// 2) 너가 준 validation 타입/함수 (같은 파일에 둔다고 가정)
// =======================
export type FieldType =
  | 'title'
  | 'category'
  | 'address'
  | 'date'
  | 'maxPeople'
  | 'during'
  | 'explain'
  | 'image';

export type FieldValueMap = {
  title: string;
  category: string;
  address: string;
  date: string;
  maxPeople: number;
  during: number;
  explain: string;
  image: File | null;
};

export type ValidationArg = {
  [K in FieldType]: { type: K; value: FieldValueMap[K] };
}[FieldType];

export function validationInput(arg: ValidationArg): string | null {
  switch (arg.type) {
    case 'title': {
      const regex = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,16}$/;
      return regex.test(arg.value)
        ? null
        : '제목은 한글, 영문, 숫자만 사용해 1~16자로 입력해주세요.';
    }

    case 'category':
      return arg.value ? null : '카테고리를 선택해 주세요.';

    case 'address':
      return arg.value ? null : '주소를 입력해주세요.';

    case 'date': {
      const now = new Date();
      const target = new Date(arg.value);
      if (isNaN(target.getTime())) return '유효한 날짜 형식이 아닙니다.';
      if (target.getTime() <= now.getTime()) return '모임 날짜는 현재 시간 이후여야 합니다.';
      return null;
    }

    case 'maxPeople': {
      const num = arg.value;
      if (!Number.isFinite(num)) return '모집 인원은 숫자로 입력해주세요.';
      if (num <= 0) return '모집 인원은 1명 이상이어야 합니다.';
      if (num > 30) return '모집 인원은 최대 30명까지 가능합니다.';
      return null;
    }

    case 'during': {
      const num = arg.value;
      if (!Number.isFinite(num)) return '모임 시간은 숫자로 입력해주세요.';
      if (num <= 0) return '모임 시간은 1시간 이상이어야 합니다.';
      if (num > 24) return '모임 시간은 최대 24시간까지 가능합니다.';
      return null;
    }

    case 'explain': {
      const regex = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,100}$/;
      return regex.test(arg.value)
        ? null
        : '설명은 한글, 영문, 숫자만 사용해 1~100자로 입력해주세요.';
    }

    case 'image':
      return arg.value ? null : '대표 사진은 필수입니다.';

    default:
      return '알 수 없는 입력값입니다.';
  }
}

type State = {
  step: number;
  form: CreateGatheringForm;
  errors: Partial<Record<FieldType, string>>;

  isAddressLoading: boolean;
  addressError: string | null;
};

const initialState: State = {
  step: 1,
  form: initialForm,
  errors: {},

  isAddressLoading: false,
  addressError: null,
};

type Action =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_FORM'; patch: Partial<CreateGatheringForm> }
  | { type: 'SET_ERROR'; field: FieldType; message: string | null }
  | { type: 'SET_ADDRESS_STATUS'; loading: boolean; error: string | null }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'SET_FORM':
      return { ...state, form: { ...state.form, ...action.patch } };

    case 'SET_ERROR': {
      const next = { ...state.errors };
      if (!action.message) delete next[action.field];
      else next[action.field] = action.message;
      return { ...state, errors: next };
    }

    case 'SET_ADDRESS_STATUS':
      return { ...state, isAddressLoading: action.loading, addressError: action.error };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// =======================
// 4) GatheringCreate component
// =======================
export default function GatheringCreate() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, form, errors, isAddressLoading, addressError } = state;

  // step 이동
  const setStep = useCallback((next: number) => dispatch({ type: 'SET_STEP', step: next }), []);
  const nextStep = useCallback(() => setStep(step + 1), [setStep, step]);
  const prevStep = useCallback(() => setStep(Math.max(1, step - 1)), [setStep, step]);

  // form 필드 업데이트 (로컬 state가 source of truth)
  const setField = useCallback(
    <K extends keyof CreateGatheringForm>(field: K, value: CreateGatheringForm[K]) => {
      dispatch({ type: 'SET_FORM', patch: { [field]: value } as Partial<CreateGatheringForm> });
    },
    [],
  );

  // 주소 처리(지오코딩)
  const resolveAddress = useCallback(
    async (address: string): Promise<boolean> => {
      const trimmed = address.trim();

      if (!trimmed) {
        dispatch({ type: 'SET_ADDRESS_STATUS', loading: false, error: '주소를 입력해주세요.' });
        dispatch({ type: 'SET_FORM', patch: { address: '', latitude: 0, longitude: 0 } });
        return false;
      }

      dispatch({ type: 'SET_ADDRESS_STATUS', loading: true, error: null });
      dispatch({ type: 'SET_FORM', patch: { address: trimmed } });

      try {
        const geo = await fetchLatLngFromAddress(trimmed);

        if (!geo) {
          dispatch({
            type: 'SET_ADDRESS_STATUS',
            loading: false,
            error: '주소를 찾을 수 없어요. 다시 확인해주세요.',
          });
          dispatch({ type: 'SET_FORM', patch: { latitude: 0, longitude: 0 } });
          return false;
        }

        dispatch({ type: 'SET_FORM', patch: { latitude: geo.latitude, longitude: geo.longitude } });
        return true;
      } catch (error) {
        if (error instanceof Error && 'latitude' in error) {
          console.log(error);
        }
        dispatch({
          type: 'SET_ADDRESS_STATUS',
          loading: false,
          error: '주소 확인 중 오류가 발생했어요.',
        });
        dispatch({ type: 'SET_FORM', patch: { latitude: 0, longitude: 0 } });
        return false;
      } finally {
        dispatch({ type: 'SET_ADDRESS_STATUS', loading: false, error: state.addressError });
      }
    },
    [state.addressError],
  );

  // ✅ commitField (여기서 validationInput arg 구조를 사용)
  const commitField: CommitFieldFn = useCallback(
    async (fieldType, value) => {
      const msg = validationInput({ type: fieldType, value } as ValidationArg);
      dispatch({ type: 'SET_ERROR', field: fieldType, message: msg });

      if (msg) return false;

      if (fieldType === 'address') {
        return await resolveAddress(value as string);
      }

      return true;
    },
    [resolveAddress],
  );

  // step1 게이트 예시
  const canNextStep1 = useMemo(
    () => Boolean(form.title && form.category),
    [form.title, form.category],
  );

  return (
    <div className="flex justify-center bg-black">
      <div
        className={cn(
          'flex h-screen w-full flex-col bg-black pt-20',
          step === 3 ? 'px-none pb-none' : 'px-4 pb-8',
        )}
      >
        <div className={cn(step === 3 ? 'px-4' : 'px-0')}>
          <StepProgressBar step={step} total={3} activeColor="#FF5126" inactiveColor="#3A3A3A" />
        </div>

        {step === 1 && (
          <Step1
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
            canNext={canNextStep1}
          />
        )}

        {step === 2 && (
          <Step2
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
            prevStep={prevStep}
            isAddressLoading={isAddressLoading}
            addressError={addressError}
          />
        )}

        {step === 3 && (
          <Step3
            form={form}
            errors={errors}
            setField={setField}
            commitField={commitField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 4 && <Step4 />}
      </div>
    </div>
  );
}
