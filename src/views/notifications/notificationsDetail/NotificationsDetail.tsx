'use client';

import Link from 'next/link';
import { useNotificationStore } from '@/stores/useNotificationsStore';
import { useEffect } from 'react';

interface NotificationDetailProps {
  id: number;
}

export default function NotificationDetail({ id }: NotificationDetailProps) {
  const { notifications, markAsRead } = useNotificationStore();
  const notification = useNotificationStore((s) => s.notifications.find((n) => n.id === id));
  useEffect(() => {
    if (notification && !notification.isRead) {
      markAsRead(id);
    }
  }, [id, notification, markAsRead]);
  if (!notification) {
    return (
      <div className="px-4 pt-10 text-white">
        <p>알림을 찾을 수 없습니다.</p>
        <Link href="/notifications" className="text-sm text-gray-400">
          ← 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10 text-white">
      <h1 className="mb-4 text-lg font-bold">알림 상세</h1>

      <p className="mb-6 leading-relaxed">{notification.message}</p>

      <p className="mb-8 text-sm text-gray-400">
        {new Date(notification.sentAt).toLocaleDateString('ko-KR')}
      </p>

      <Link href={`/notifications`} className="text-sm text-gray-400">
        목록으로
      </Link>
    </div>
  );
}
