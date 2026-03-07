import axiosInstance from '../lib/axiosInstance';
import { API } from '../lib/apiRoutes';
import type { Card } from '../types/board';

export const cardService = {
  create: (boardId: number, colId: number, data: { title: string }) =>
    axiosInstance.post<Card>(API.BOARD.CARDS(boardId, colId), data).then((res) => res.data),
  update: (
    boardId: number,
    colId: number,
    cardId: number,
    data: { title?: string; position?: number; columnId?: number },
  ) =>
    axiosInstance
      .patch<Card>(API.BOARD.CARDS_ID(boardId, colId, cardId), data)
      .then((res) => res.data),
  remove: (boardId: number, colId: number, cardId: number) =>
    axiosInstance.delete(API.BOARD.CARDS_ID(boardId, colId, cardId)),
};
