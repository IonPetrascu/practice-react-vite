import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import CardForm from '@/components/CardForm/CardForm';
import ColumnHeader from './ColumnHeader';
import type { ColumnProps } from './types';

export default function Column({
  children,
  id,
  index,
  title,
  boardId,
  onCardCreated,
  onDelete,
  cardCount,
}: ColumnProps) {
  const { isDropTarget, ref: droppableRef } = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });

  const { ref: sortableRef } = useSortable({
    id,
    index,
    type: 'column',
    accept: ['item', 'column'],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      className={`flex w-64 min-w-64 flex-col gap-2 rounded-xl border p-3 transition-colors ${
        isDropTarget ? 'border-zinc-600 bg-zinc-800/80' : 'border-zinc-800 bg-zinc-900'
      }`}
      ref={(node) => {
        droppableRef(node);
        sortableRef(node);
      }}
    >
      <ColumnHeader title={title} onDelete={onDelete} cardCount={cardCount} />
      <div className="flex flex-col gap-2">{children}</div>
      <CardForm
        boardId={boardId}
        columnId={Number(id.replace('col-', ''))}
        onSuccess={onCardCreated}
      />
    </div>
  );
}
