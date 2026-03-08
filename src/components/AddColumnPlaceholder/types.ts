import type { Column } from '@/types/board';

export type AddColumnPlaceholderProps = {
  boardId: number;
  onSuccess: (column: Column) => void;
};
