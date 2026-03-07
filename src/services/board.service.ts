import axiosInstance from '../lib/axiosInstance';
import { API } from '../lib/apiRoutes';
import type { Board, BoardInvitation, BoardMember, BoardResponse, BoardRole } from '../types/board';

export const boardsService = {
  getAll: () => axiosInstance.get<Board[]>(API.BOARD.BASE).then((res) => res.data),
  create: (data: { title: string }) =>
    axiosInstance.post<Omit<Board, 'role'>>(API.BOARD.BASE, data).then((res) => res.data),
  getById: (id: number) =>
    axiosInstance.get<BoardResponse>(API.BOARD.BY_ID(id)).then((res) => res.data),
  rename: (id: number, data: { title: string }) => axiosInstance.patch(API.BOARD.BY_ID(id), data),
  delete: (id: number) => axiosInstance.delete(API.BOARD.BY_ID(id)),
  //board members
  getAllMembers: (id: number) =>
    axiosInstance.get<BoardMember[]>(API.BOARD.MEMBERS(id)).then((res) => res.data),
  updateMember: (id: number, userId: number, data: { role: BoardRole }) =>
    axiosInstance
      .patch<BoardMember>(API.BOARD.MEMBERS_ID(id, String(userId)), data)
      .then((res) => res.data),
  removeMember: (id: number, userId: number) =>
    axiosInstance.delete(API.BOARD.MEMBERS_ID(id, String(userId))),
  //sent invitations
  getInvitations: (id: number) =>
    axiosInstance.get<BoardInvitation[]>(API.BOARD.INVITATIONS(id)).then((res) => res.data),
  createInvitation: (id: number, data: { email: string; role?: BoardRole }) =>
    axiosInstance.post<BoardInvitation>(API.BOARD.INVITATIONS(id), data).then((res) => res.data),
  revokeInvitation: (id: number, invId: number) =>
    axiosInstance.delete(API.BOARD.INVITATIONS_ID(id, invId)),
};
