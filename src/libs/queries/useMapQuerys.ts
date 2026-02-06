import { useQueries, keepPreviousData } from '@tanstack/react-query';
import { eventsAPI } from '@/libs/api/events/eventsAPI';
import { groupsAPI } from '@/libs/api/groups/groupsAPI';
import type { GroupSearchParams } from '@/libs/api/groups/groups.types';

// 너 프로젝트에 이미 있는 키 함수가 있다면 그걸 쓰고,
// 없으면 여기처럼 간단히 만들어도 됨.
const eventsKey = (p: { page: number; size: number; sortBy: string; guname: string }) =>
  ['events', 'map', p.page, p.size, p.sortBy, p.guname] as const;

const groupsKey = (p: {
  page: number;
  size: number;
  sortBy: string;
  category?: string;
  keyword?: string;
}) => ['groups', 'map', p.sortBy, p.page, p.size, p.category ?? '', p.keyword ?? ''] as const;

export function useMapQueries(args: {
  pageNo: number;
  placeName: string;
  groups?: Pick<GroupSearchParams, 'category' | 'keyword'>;
}) {
  const eventsParams = {
    page: args.pageNo,
    size: 20,
    sortBy: 'endDate',
    guname: args.placeName,
  };

  const groupsParams = {
    sortBy: 'distance' as const,
    page: args.pageNo,
    size: 20,
    category: args.groups?.category ?? null,
    keyword: args.groups?.keyword ?? null,
  };

  const [eventsQuery, groupsQuery] = useQueries({
    queries: [
      {
        queryKey: eventsKey(eventsParams),
        queryFn: () => eventsAPI.getEvent(eventsParams),
        placeholderData: keepPreviousData,
        enabled: !!args.placeName, // placeName 준비되면 호출
      },
      {
        queryKey: groupsKey({
          page: groupsParams.page,
          size: groupsParams.size,
          sortBy: groupsParams.sortBy,
          category: groupsParams.category ?? undefined,
          keyword: groupsParams.keyword ?? undefined,
        }),
        queryFn: () => groupsAPI.searchGroups(groupsParams),
        placeholderData: keepPreviousData,
      },
    ],
  });

  // 컴포넌트에서 쓰기 좋게 “합쳐서” 리턴해주기
  const isLoading = eventsQuery.isLoading || groupsQuery.isLoading;
  const isFetching = eventsQuery.isFetching || groupsQuery.isFetching;
  const error =
    (eventsQuery.error as Error | undefined) ?? (groupsQuery.error as Error | undefined) ?? null;

  return {
    eventsPage: eventsQuery.data,
    groupsPage: groupsQuery.data,
    isLoading,
    isFetching,
    error,
    // 필요하면 개별 쿼리도 노출 가능
    eventsQuery,
    groupsQuery,
  };
}
