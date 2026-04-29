import { create } from 'zustand';

export interface NotificationsItem {
  id: number;
  message: string;
  isRead: boolean;
  sentAt: string;
  type: string;
}

interface NotificationState {
  notifications: NotificationsItem[];
  setNotifications: (list: NotificationsItem[]) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  setNotifications: (list) => set({ notifications: list }),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        isRead: true,
      })),
    })),
}));
