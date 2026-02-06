import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { groupsAPI } from '../api/groups/groupsAPI';
import type { GroupSearchParams } from '../api/groups/groups.types';

/**
 * queryKey는 "캐시 식별자"라서
 * map/search 등 용도 분리하고 싶으면 두 번째 값에 'map'/'search' 같은 태그를 넣는 게 안전함
 */
export const groupsSearchKey = (params: GroupSearchParams) =>
  [
    'groups',
    'search',
    params.sortBy ?? 'distance',
    params.category ?? '',
    params.keyword ?? '',
    params.page ?? 0,
    params.size ?? 20,
  ] as const;

export function useGroupsSearchQuery(params: GroupSearchParams) {
  return useQuery({
    queryKey: groupsSearchKey(params),
    queryFn: () => groupsAPI.searchGroups(params),
    placeholderData: keepPreviousData, // 페이지 바뀔 때 깜빡임 방지
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
