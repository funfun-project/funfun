'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { useNotifications } from '@/libs/api/notifications/hook/useNotifications';
import { NotificationsItem, useNotificationStore } from '@/stores/useNotificationsStore';
import { useRouter } from 'next/navigation';

type FilterType = 'all' | 'read' | 'unread';

type DummyNotification = {
  id: number;
  message: string;
  isRead: boolean;
  timeText: string;
};

export default function NotificationContainer() {
  const { notificationQuery, readOneMutation } = useNotifications();
  const { notifications, setNotifications, markAsRead } = useNotificationStore();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [tempFilter, setTempFilter] = useState<FilterType>('all');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dummyData: DummyNotification[] = [
    { id: 1, message: '(광고) 2025년 싸이 흠뻑쇼 티켓 오픈', isRead: false, timeText: '2시간 전' },
    { id: 2, message: '(광고) 2025년 싸이 흠뻑쇼 예매 안내', isRead: true, timeText: '1일 전' },
    { id: 3, message: '(광고) 2025년 싸이 흠뻑쇼 부산 공연', isRead: true, timeText: '54일 전' },
  ];

  useEffect(() => {
    if (notificationQuery.data) {
      setNotifications(notificationQuery.data);
    }
  }, [notificationQuery.data, setNotifications]);

  const sourceData = notifications.length > 0 ? notifications : dummyData;

  const filterMap: Record<FilterType, (n: NotificationsItem | DummyNotification) => boolean> = {
    all: () => true,
    read: (n) => n.isRead,
    unread: (n) => !n.isRead,
  };
  const filteredNotifications = useMemo(() => {
    return sourceData.filter(filterMap[filter]);
  }, [sourceData, filter]);

  const handleReadOne = (id: number) => {
    readOneMutation.mutate(id, {
      onSuccess: () => markAsRead(id),
      onError: () => toast.error('요청 실패'),
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-black px-4 py-4">
        <button onClick={() => router.push('/')} className="text-xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">알림</h1>
        <button className="text-xl" onClick={() => setIsMenuOpen(true)}>
          ≡
        </button>
      </div>

      <div className="relative flex border-b border-neutral-800">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-3 text-center ${filter === 'all' ? 'text-white' : 'text-gray-500'}`}
        >
          전체
        </button>

        <button
          onClick={() => {
            setTempFilter(filter);
            setIsFilterOpen(true);
          }}
          className="flex-1 py-3 text-center text-gray-500"
        >
          필터
        </button>

        <div className="absolute bottom-0 left-0 h-[2px] w-1/2 bg-[#FF5126]" />
      </div>

      {filteredNotifications.map((bell) => (
        <Link
          key={bell.id}
          href={`/notifications/${bell.id}`}
          onClick={() => {
            if (!bell.isRead) handleReadOne(bell.id);
          }}
        >
          <div className="border-b border-neutral-800 px-4 py-5 hover:bg-neutral-900">
            <div className="flex items-start justify-between">
              <p className={bell.isRead ? 'text-gray-500' : 'text-white'}>{bell.message}</p>
              <span className="text-xs text-gray-500">{bell.timeText}</span>
            </div>
          </div>
        </Link>
      ))}

      {isMenuOpen && (
        <>
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60" />

          <div className="animate-slideUp absolute right-0 bottom-0 left-0 rounded-t-2xl bg-neutral-900 p-5">
            <div className="mb-4 flex justify-between">
              <h2 className="font-semibold">메뉴</h2>
              <button onClick={() => setIsMenuOpen(false)}>✕</button>
            </div>

            <div className="space-y-4">
              <button className="block w-full text-left">설정</button>
              <button className="block w-full text-left">알림 설정</button>
              <button className="block w-full text-left">로그아웃</button>
            </div>
          </div>
        </>
      )}

      {isFilterOpen && (
        <>
          <div onClick={() => setIsFilterOpen(false)} className="absolute inset-0 bg-black/60" />

          <div className="animate-slideUp absolute right-0 bottom-0 left-0 rounded-t-2xl bg-neutral-900 p-5">
            <div className="mb-4 text-xl font-semibold">필터</div>

            <div className="space-y-4 border-b border-neutral-800 pb-4">
              {(['all', 'read', 'unread'] as FilterType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setTempFilter(type)}
                  className="flex w-full justify-between"
                >
                  <span>
                    {type === 'all'
                      ? '전체 알림'
                      : type === 'read'
                        ? '읽은 알림'
                        : '읽지 않은 알림'}
                  </span>
                  {tempFilter === type && <span className="text-[#FF5126]">✓</span>}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setFilter(tempFilter);
                setIsFilterOpen(false);
              }}
              className="mt-6 w-full rounded-md bg-[#FF5126] py-3 font-semibold"
            >
              완료
            </button>
          </div>
        </>
      )}
    </main>
  );
}
