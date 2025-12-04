export async function patchNotificationReadSelected(ids: number[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read-selected`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error('선택 알림 읽음 처리 실패');
  return (await res.json()) as unknown;
}
