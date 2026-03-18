export type FieldType =
  | 'title'
  | 'category'
  | 'address'
  | 'groupDate'
  | 'maxPeople'
  | 'during'
  | 'explain'
  | 'image'
  | 'inquiry';

export type FieldValueMap = {
  title: string | null;
  category: string;
  address: string;
  groupDate: Date | null;
  maxPeople: number | null | string;
  during: number | null | string;
  explain: string;
  image: File | null;
  inquiry: string;
};

export interface CreateGatheringForm extends Pick<
  FieldValueMap,
  'title' | 'category' | 'address' | 'groupDate' | 'maxPeople' | 'during' | 'explain' | 'image'
> {
  simpleExplain: string;
  placeName: string;
  joinCategory: string[];
  latitude: number;
  longitude: number;
  hashTags: string[];
}

export const initialForm: CreateGatheringForm = {
  title: null,
  explain: '',
  simpleExplain: '',
  placeName: '',
  groupDate: null,
  address: '',
  category: '',
  joinCategory: [],
  maxPeople: null,
  latitude: 0,
  longitude: 0,
  image: null,
  hashTags: [],
  during: null,
};

export type ValidationArg = {
  [K in FieldType]: { type: K; value: FieldValueMap[K] };
}[FieldType];

export type CommitFieldFn = <K extends FieldType>(
  fieldType: K,
  value: FieldValueMap[K],
) => Promise<boolean>;

export function validationInput(arg: ValidationArg): string | null {
  switch (arg.type) {
    case 'title': {
      if (!arg.value) return '모임 제목을 작성해주세요.';

      const regex = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,16}$/;
      return regex.test(arg.value)
        ? null
        : '제목은 한글, 영문, 숫자만 사용해 1~16자로 입력해주세요.';
    }

    case 'category':
      return arg.value ? null : '카테고리를 선택해 주세요.';

    case 'address':
      return arg.value ? null : '주소를 입력해주세요.';

    case 'groupDate': {
      if (!arg.value) return '날짜를 선택해주세요.';

      const now = new Date();
      const target = new Date(arg.value);
      console.log(now.getTime() <= target.getTime());
      console.log(now.getTime(), target.getTime());
      if (isNaN(target.getTime())) return '유효한 날짜 형식이 아닙니다.';
      if (target.getTime() <= now.getTime()) return '모임 날짜는 현재 시간 이후여야 합니다.';
      return null;
    }

    case 'maxPeople': {
      const value = String(arg.value ?? '').trim();

      if (!value) return '최대 인원을 정해주세요.';
      if (!/^\d+$/.test(value)) return '모집 인원은 숫자로 입력해주세요.';

      const num = Number(value);

      if (num <= 0) return '모집 인원은 1명 이상이어야 합니다.';
      if (num > 30) return '모집 인원은 최대 30명까지 가능합니다.';

      return null;
    }

    case 'during': {
      const value = String(arg.value ?? '').trim();

      if (!value) return '모임 시간을 정해주세요.';
      if (!/^\d+$/.test(value)) return '모임 시간은 숫자로 입력해주세요.';

      const num = Number(value);

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

    case 'inquiry': {
      const regex = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,200}$/;
      return regex.test(arg.value) ? null : '문의 내용은 필수 항목 입니다.';
    }

    default:
      return '알 수 없는 입력값입니다.';
  }
}
