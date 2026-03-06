import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '../types/auth';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }, false, 'setUser'),
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
    }),
    { name: 'authStore' },
  ),
);
