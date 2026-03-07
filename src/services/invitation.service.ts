import axiosInstance from '../lib/axiosInstance';
import { API } from '../lib/apiRoutes';
import type { BoardInvitation } from '../types/board';

export const invitationService = {
  getAll: () => axiosInstance.get<BoardInvitation[]>(API.INVITATIONS.BASE).then((res) => res.data),
  getByToken: (token: string) =>
    axiosInstance.get<BoardInvitation>(API.INVITATIONS.BY_TOKEN(token)).then((res) => res.data),
  accept: (token: string) =>
    axiosInstance.post<{ boardId: number }>(API.INVITATIONS.ACCEPT(token)).then((res) => res.data),
  decline: (token: string) => axiosInstance.post(API.INVITATIONS.DECLINE(token)),
};
