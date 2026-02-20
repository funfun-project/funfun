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
  date: string; // 지금 너는 string으로 쓰고 있으니 일단 string 고정 추천
  maxPeople: number;
  during: number;
  explain: string;
  image: File | null;
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
      const regex = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,16}$/;
      // ✅ 여기서 arg.value는 string으로 자동 좁혀짐 → 에러 없음
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
      const target = new Date(arg.value); // ✅ string
      if (isNaN(target.getTime())) return '유효한 날짜 형식이 아닙니다.';
      if (target.getTime() <= now.getTime()) return '모임 날짜는 현재 시간 이후여야 합니다.';
      return null;
    }

    case 'maxPeople': {
      const num = arg.value; // ✅ number
      if (!Number.isFinite(num)) return '모집 인원은 숫자로 입력해주세요.';
      if (num <= 0) return '모집 인원은 1명 이상이어야 합니다.';
      if (num > 30) return '모집 인원은 최대 30명까지 가능합니다.';
      return null;
    }

    case 'during': {
      const num = arg.value; // ✅ number
      if (!Number.isFinite(num)) return '모임 시간은 숫자로 입력해주세요.';
      if (num <= 0) return '모임 시간은 1시간 이상이어야 합니다.';
      if (num > 24) return '모임 시간은 최대 24시간까지 가능합니다.';
      return null;
    }

    case 'explain': {
      const regex = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,100}$/;
      // ✅ string
      return regex.test(arg.value)
        ? null
        : '설명은 한글, 영문, 숫자만 사용해 1~100자로 입력해주세요.';
    }

    case 'image':
      // ✅ File | null
      return arg.value ? null : '대표 사진은 필수입니다.';

    default:
      return '알 수 없는 입력값입니다.';
  }
}
