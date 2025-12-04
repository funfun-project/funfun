export async function putNotification(id: number, data: { title?: string; message?: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('알림 수정 실패');
  return (await res.json()) as unknown;
}
