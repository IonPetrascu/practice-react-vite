import axiosInstance from '../lib/axiosInstance';
import { API } from '../lib/apiRoutes';
import type { Note } from '../types/note';

export const notesService = {
  getAll: () => axiosInstance.get<Note[]>(API.NOTES.BASE).then((res) => res.data),

  getById: (id: number) => axiosInstance.get<Note>(API.NOTES.BY_ID(id)).then((res) => res.data),

  create: (data: Pick<Note, 'title' | 'content'>) =>
    axiosInstance.post<Note>(API.NOTES.BASE, data).then((res) => res.data),

  update: (id: number, data: Partial<Pick<Note, 'title' | 'content'>>) =>
    axiosInstance.patch<Note>(API.NOTES.BY_ID(id), data).then((res) => res.data),

  remove: (id: number) => axiosInstance.delete(API.NOTES.BY_ID(id)).then((res) => res.data),
};
