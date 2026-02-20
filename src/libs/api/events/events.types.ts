export interface ApiResponse<T> {
  code: string; // e.g. "0000"
  message: string;
  reason: string | null;
  data: T;
}
export type ContentCategory =
  | 'THEATER'
  | 'DANCE'
  | 'POP_DANCE'
  | 'CLASSIC'
  | 'GUKAK'
  | 'POP_MUSIC'
  | 'MIX'
  | 'MAGIC'
  | 'MUSICAL'
  | 'TOUR'
  | 'CULTURE'
  | 'SPORTS';

export type SortBy = 'bookmarkCount' | 'endDate' | 'distance';

export type SortParam = `${string},${'asc' | 'desc'}`;

export interface GetContentsParams {
  category?: ContentCategory;
  guname?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  keyword?: string;
  sortBy?: SortBy;
  page?: number; // 0-based, default 0
  size?: number; // default 20
  sort?: SortParam[]; // multiple sort criteria supported
}

export type SortDirection = 'ASC' | 'DESC';
export type NullHandling = 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';

export interface SortItem {
  direction: SortDirection;
  property: string;
  ignoreCase: boolean;
  nullHandling: NullHandling;
  ascending: boolean;
  descending: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortItem[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ContentsPage {
  content: ContentItem[];

  pageable: Pageable;

  totalElements: number;
  totalPages: number;

  last: boolean;
  first: boolean;
  empty: boolean;

  size: number;
  number: number;
  numberOfElements: number;

  sort: SortItem[];
}

export type GetContentsResponse = ApiResponse<ContentsPage>;
