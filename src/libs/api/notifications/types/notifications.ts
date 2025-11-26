export interface NotificationItem {
  id: number;
  email: string;
  message: string;
  link: string;
  isRead: boolean;
  type: string;
  scheduledAt: string;
  sentAt: string;
  calendarId: null;
  applicantEmail: string | null;
}

export interface NotificationUpdatePayload {
  email?: string;
  message?: string;
  link?: string;
  type?: string;
  scheduledAt?: string;
  sentAt?: string;
  calendarId?: number;
  isRead?: boolean;
}
