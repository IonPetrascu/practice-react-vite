const API_PREFIX = '/api/v1';

const build = (path: string) => `${API_PREFIX}${path}`;

export const API = {
  NOTES: {
    BASE: build('/notes'),
    BY_ID: (id: number) => build(`/notes/${id}`),
  },
  AUTH: {
    REGISTER: build('/auth/register'),
    LOGIN: build('/auth/login'),
    LOGOUT: build('/auth/logout'),
    ME: build('/auth/me'),
  },
  BOARD: {
    BASE: build('/boards'),
    BY_ID: (id: number) => build(`/boards/${id}`),
    MEMBERS: (id: number) => build(`/boards/${id}/members`),
    MEMBERS_ID: (id: number, userId: string) => build(`/boards/${id}/members/${userId}`),
    INVITATIONS: (id: number) => build(`/boards/${id}/invitations`),
    INVITATIONS_ID: (id: number, invId: number) => build(`/boards/${id}/invitations/${invId}`),
    COLUMNS: (id: number) => build(`/boards/${id}/columns`),
    COLUMNS_ID: (id: number, colId: number) => build(`/boards/${id}/columns/${colId}`),
    CARDS: (id: number, colId: number) => build(`/boards/${id}/columns/${colId}/cards`),
    CARDS_ID: (id: number, colId: number, cardId: number) =>
      build(`/boards/${id}/columns/${colId}/cards/${cardId}`),
  },
  INVITATIONS: {
    BASE: build('/invitations'),
    BY_TOKEN: (token: string) => build(`/invitations/${token}`),
    ACCEPT: (token: string) => build(`/invitations/${token}/accept`),
    DECLINE: (token: string) => build(`/invitations/${token}/decline`),
  },
};
