import axiosInstance from '../lib/axiosInstance';
import { API } from '../lib/apiRoutes';
import type { Column } from '../types/board';

export const columnService = {
  create: (boardId: number, data: { title: string }) =>
    axiosInstance.post<Column>(API.BOARD.COLUMNS(boardId), data).then((res) => res.data),
  update: (boardId: number, colId: number, data: { title?: string; position?: number }) =>
    axiosInstance.patch<Column>(API.BOARD.COLUMNS_ID(boardId, colId), data).then((res) => res.data),
  remove: (boardId: number, colId: number) =>
    axiosInstance.delete(API.BOARD.COLUMNS_ID(boardId, colId)),
};
