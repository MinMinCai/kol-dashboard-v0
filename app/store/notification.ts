import { create } from 'zustand';

interface NotificationData {
  isOpen: boolean;
  title: string;
  message: string;
  actionLink?: string;
}

interface NotificationState {
  toast: NotificationData | null;
  banner: NotificationData | null;
  showToast: (title: string, message: string, actionLink?: string) => void;
  hideToast: () => void;
  showBanner: (title: string, message: string, actionLink?: string) => void;
  hideBanner: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  toast: null,
  banner: null,
  showToast: (title, message, actionLink) => {
    set({ toast: { isOpen: true, title, message, actionLink } });
  },
  hideToast: () => set({ toast: null }),
  showBanner: (title, message, actionLink) => set({ banner: { isOpen: true, title, message, actionLink } }),
  hideBanner: () => set({ banner: null })
}));
