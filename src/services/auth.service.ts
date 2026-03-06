import axiosInstance from '../lib/axiosInstance';
import { API } from '../lib/apiRoutes';
import type { User } from '../types/auth';

export const authService = {
  register: (data: { email: string; password: string }) =>
    axiosInstance.post<User>(API.AUTH.REGISTER, data).then((res) => res.data),

  login: (data: { email: string; password: string }) =>
    axiosInstance.post<User>(API.AUTH.LOGIN, data).then((res) => res.data),

  logout: () => axiosInstance.post(API.AUTH.LOGOUT).then((res) => res.data),

  me: () => axiosInstance.get<User>(API.AUTH.ME).then((res) => res.data),
};
