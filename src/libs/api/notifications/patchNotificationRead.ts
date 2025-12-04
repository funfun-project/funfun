export async function patchNotificationRead(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('읽음 처리 실패');
  return (await res.json()) as unknown;
}
