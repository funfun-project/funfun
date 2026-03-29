import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '@/libs/api/events/eventsAPI';

export type EventsParams = Record<string, string | number | undefined | null>;

export const searchEventsQueryKey = (params: EventsParams) => ['events', params] as const;

export function useSearchEventsQuery(params: EventsParams) {
  return useQuery({
    queryKey: searchEventsQueryKey(params),
    queryFn: () => eventsAPI.getEvent(params),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
