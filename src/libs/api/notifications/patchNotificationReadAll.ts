export async function patchNotificationReadAll() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read-all`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('전체 읽음 처리 실패');
  return res.json();
}
