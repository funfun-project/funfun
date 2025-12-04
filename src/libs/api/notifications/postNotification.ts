export async function postNotification(data: {
  userId: number;
  title: string;
  message: string;
  type?: string;
  link?: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('알림 생성 실패');
  return (await res.json()) as unknown;
}
