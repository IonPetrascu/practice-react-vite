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
};
