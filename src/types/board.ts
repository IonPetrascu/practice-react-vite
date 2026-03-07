import type { PublicUser } from './auth';

export const BoardRole = {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
} as const;

export type BoardRole = (typeof BoardRole)[keyof typeof BoardRole];

export const InvitationStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
} as const;

export type InvitationStatus = (typeof InvitationStatus)[keyof typeof InvitationStatus];

export type Board = {
  id: number;
  title: string;
  ownerId: number;
  createdAt: string;
  role: BoardRole;
};

export type BoardMember = {
  boardId: number;
  userId: number;
  role: BoardRole;
  joinedAt: string;
  user: PublicUser;
};
export type BoardInvitation = {
  id: number;
  boardId: number;
  invitedBy: number;
  email: string;
  role: BoardRole;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
  token?: string;
  board?: { id?: number; title: string };
  inviter?: PublicUser;
};

export type Column = {
  id: number;
  boardId: number;
  title: string;
  position: number;
  cards: Card[];
};

export type Card = {
  id: number;
  columnId: number;
  title: string;
  position: number;
  createdAt: string;
};

export type BoardResponse = {
  id: number;
  title: string;
  ownerId: number;
  createdAt: string;
  columns: Column[];
};
