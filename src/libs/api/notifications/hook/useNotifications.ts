// src/hooks/useNotifications.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications } from '../getNotifications';
import {
  patchNotificationRead,
  patchNotificationReadAll,
  patchNotificationReadSelected,
} from '../patchNotification';

export function useNotifications() {
  const queryClient = useQueryClient();

  // 알림 목록 조회 (GET)
  const notificationQuery = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  // 단일 읽음 처리 (PATCH /:id/read)
  const readOneMutation = useMutation({
    mutationFn: (id: number) => patchNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // 전체 읽음 처리 (PATCH /read-all)
  const readAllMutation = useMutation({
    mutationFn: () => patchNotificationReadAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // 선택 읽음 처리 (PATCH /read-selected)
  const readSelectedMutation = useMutation({
    mutationFn: (ids: number[]) => patchNotificationReadSelected(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notificationQuery,
    readOneMutation,
    readAllMutation,
    readSelectedMutation,
  };
}
