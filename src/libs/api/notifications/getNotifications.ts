export async function getNotifications() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('알림 목록 조회 실패');
  return res.json();
}

export async function getReadNotifications() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read`);
  if (!res.ok) throw new Error('읽은 알림 조회 실패');
  return res.json();
}
export async function getRecentNotifications() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/recent`);
  if (!res.ok) throw new Error('최근 알림 조회 실패');
  return res.json();
}
export async function getUnreadCount() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/unread-count`);
  if (!res.ok) throw new Error('안읽은 알림 수 조회 실패');
  return res.json();
}
export async function getUnreadNotifications() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/unread`);
  if (!res.ok) throw new Error('안읽은 알림 조회 실패');
  return res.json();
}
