import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import CardForm from './CardForm/CardForm';
import type { Card } from '../types/board';
import ColumnHeader from './ColumnHeader';

type Props = {
  children: React.ReactNode;
  id: string;
  index: number;
  title: string;
  boardId: number;
  cardCount: number;
  onCardCreated: (card: Card) => void;
  onDelete: () => void;
};

export default function Column({
  children,
  id,
  index,
  title,
  boardId,
  onCardCreated,
  onDelete,
  cardCount,
}: Props) {
  const { isDropTarget, ref: droppableRef } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });
  const style = isDropTarget ? { background: '#00000030' } : undefined;
  const { ref: sortableRef } = useSortable({
    id,
    index,
    type: 'column',
    accept: ['item', 'column'],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      className="flex min-h-20 w-62.5 min-w-62.5 flex-col gap-6"
      ref={(node) => {
        droppableRef(node);
        sortableRef(node);
      }}
      style={style}
    >
      <ColumnHeader title={title} onDelete={onDelete} cardCount={cardCount} />
      {children}
      <CardForm
        boardId={boardId}
        columnId={Number(id.replace('col-', ''))}
        onSuccess={onCardCreated}
      />
    </div>
  );
}
