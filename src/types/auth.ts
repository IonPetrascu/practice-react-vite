export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type User = {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
};

export type PublicUser = Pick<User, 'id' | 'email' | 'name'>;
