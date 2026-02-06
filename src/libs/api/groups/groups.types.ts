/**
 * /api/groups/search 응답 타입 정의
 * - Swagger + 실제 응답 기준
 * - any 사용 없음 (content는 unknown[]로 처리)
 */

export interface ApiResponse<T> {
  code: string; // "0000"
  message: string;
  reason: string | null;
  data: T;
}

/** 요청 파라미터 타입 */
export type GroupCategory =
  | 'ART'
  | 'TRAVEL'
  | 'FOOD'
  | 'GAME'
  | 'CULTURE'
  | 'SPORT'
  | 'STUDY'
  | 'MOVIE';

export type GroupSortBy = 'recent' | 'viewCount' | 'distance';

export interface GroupSearchParams {
  category?: GroupCategory | null;
  keyword?: string | null;
  sortBy?: GroupSortBy; // default: distance
  page?: number; // default: 0
  size?: number; // default: 20 (스웨거 예시)
}

/** pageable/sort (실응답에서 sort: [] 형태) */
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: unknown[]; // 현재 응답에서 sort가 []로만 옴 → 구조 미확정이라 unknown[]
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

/** data(page) */
export interface GroupsPage {
  content: unknown[]; // ✅ any 금지 → unknown[] (나중에 GroupItem[]로 바꾸면 됨)
  pageable: Pageable;

  totalElements: number;
  totalPages: number;

  last: boolean;
  first: boolean;
  empty: boolean;

  size: number;
  number: number; // 0-based
  numberOfElements: number;

  sort: unknown[]; // 현재 []로 옴
}

export type GetGroupsSearchResponse = ApiResponse<GroupsPage>;
