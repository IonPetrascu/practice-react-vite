import { Trash2 } from 'lucide-react';
import type { ColumnHeaderProps } from './types';

export default function ColumnHeader({ onDelete, title, cardCount }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-100">{title}</span>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-zinc-700 px-1 text-xs text-zinc-400">
          {cardCount}
        </span>
      </div>
      <button
        className="cursor-pointer text-zinc-600 transition-colors hover:text-red-400"
        onClick={onDelete}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
