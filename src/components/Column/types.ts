import type { Card } from '@/types/board';

export type ColumnProps = {
  children: React.ReactNode;
  id: string;
  index: number;
  title: string;
  boardId: number;
  cardCount: number;
  onCardCreated: (card: Card) => void;
  onDelete: () => void;
};

export type ColumnHeaderProps = {
  onDelete: () => void;
  title: string;
  cardCount: number;
};
