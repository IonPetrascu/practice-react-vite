import { useSortable } from '@dnd-kit/react/sortable';
import { X } from 'lucide-react';
import type { CardProps } from './types';

export default function Card({ id, index, column, title, onDelete }: CardProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column,
  });

  return (
    <div
      className={`group flex items-start justify-between rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 transition-colors hover:border-zinc-600 ${
        isDragging ? 'opacity-50' : ''
      }`}
      ref={ref}
      data-dragging={isDragging}
    >
      <span className="text-sm text-zinc-200">{title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="ml-2 shrink-0 cursor-pointer text-zinc-600 opacity-0 transition-all group-hover:opacity-100 hover:text-red-400"
      >
        <X size={14} />
      </button>
    </div>
  );
}
