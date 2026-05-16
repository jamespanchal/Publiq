import { create } from 'zustand';
import authService from '@/lib/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'creator' | 'venue' | 'admin';
  isVerified: boolean;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, userType: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(email, password);
      set({
        user: response.data.user,
        token: response.data.token,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false
      });
      throw error;
    }
  },

  register: async (email: string, password: string, firstName: string, lastName: string, userType: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(email, password, firstName, lastName, userType);
      set({
        user: response.data.user,
        token: response.data.token,
        isLoading: false
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },

  setUser: (user: User | null) => {
    set({ user });
  }
}));
