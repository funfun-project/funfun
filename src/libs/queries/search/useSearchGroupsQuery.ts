import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { groupsAPI } from '../../api/groups/groupsAPI';
import type { GroupSearchParams } from '../../api/groups/groups.types';

export const searchGroupsKey = (params: GroupSearchParams) =>
  [
    'groups',
    'search',
    params.sortBy ?? 'distance',
    params.category ?? '',
    params.keyword ?? '',
    params.page ?? 0,
    params.size ?? 20,
  ] as const;

export function useSearchGroupsQuery(params: GroupSearchParams) {
  return useQuery({
    queryKey: searchGroupsKey(params),
    queryFn: () => groupsAPI.searchGroups(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
