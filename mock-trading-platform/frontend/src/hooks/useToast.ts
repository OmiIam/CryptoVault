'use client';

import { create } from 'zustand';
import { ToastData } from '@/components/ui/Toast';

interface ToastStore {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));

export const useToast = () => {
  const { addToast, removeToast, clearToasts, toasts } = useToastStore();

  const toast = {
    success: (title: string, message?: string, duration?: number) => {
      addToast({ type: 'success' as const, title, message, duration });
    },
    error: (title: string, message?: string, duration?: number) => {
      addToast({ type: 'error' as const, title, message, duration });
    },
    warning: (title: string, message?: string, duration?: number) => {
      addToast({ type: 'warning' as const, title, message, duration });
    },
    info: (title: string, message?: string, duration?: number) => {
      addToast({ type: 'info' as const, title, message, duration });
    },
    custom: (toast: Omit<ToastData, 'id'>) => {
      addToast(toast);
    },
  };

  return {
    toast,
    toasts,
    removeToast,
    clearToasts,
  };
};