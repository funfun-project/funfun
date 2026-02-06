import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '@/libs/api/events/eventsAPI';

// params 타입을 더 엄격히 하고 싶으면 여기서 interface로 바꿔도 됨
export type EventsParams = Record<string, string | number | undefined | null>;

export const eventsQueryKey = (params: EventsParams) => ['events', params] as const;

export function useEventsQuery(params: EventsParams) {
  return useQuery({
    queryKey: eventsQueryKey(params),
    queryFn: () => eventsAPI.getEvent(params),
    staleTime: 30_000, // 30초 동안 fresh로 취급 (원하는 값으로 조정)
    gcTime: 5 * 60_000, // 캐시 유지 시간(기본 5분 등)
  });
}
