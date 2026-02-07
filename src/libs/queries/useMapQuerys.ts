import { useQueries, keepPreviousData } from '@tanstack/react-query';
import { eventsAPI } from '@/libs/api/events/eventsAPI';
import { groupsAPI } from '@/libs/api/groups/groupsAPI';
import type { GroupSearchParams } from '@/libs/api/groups/groups.types';

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
    eventsQuery,
    groupsQuery,
  };
}
