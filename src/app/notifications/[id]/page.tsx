import NotificationDetail from '@/views/notifications/notificationsDetail/NotificationsDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotificationDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <NotificationDetail id={Number(id)} />;
}
