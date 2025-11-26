import { notificationsFetch } from './notificationsFetch';

export async function getNotifications() {
  return notificationsFetch('/api/notifications');
}
export async function postNotification(data: {
  userId: number;
  title: string;
  message: string;
  type?: string;
  link?: string;
}) {
  return notificationsFetch('/api/notifications', {
    method: 'POST',
    body: data,
  });
}
