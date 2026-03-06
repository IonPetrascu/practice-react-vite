export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type User = {
  id: number;
  email: string;
  role: UserRole;
  createdAt: string;
};
