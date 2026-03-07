import { useSortable } from '@dnd-kit/react/sortable';
import { X } from 'lucide-react';

type Props = {
  id: number;
  index: number;
  column: string;
  title: string;
  onDelete: () => void;
};

export default function Card({ id, index, column, title, onDelete }: Props) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column,
  });

  return (
    <div
      className="flex items-center justify-between rounded-lg border border-[#606b80] bg-white p-4"
      ref={ref}
      data-dragging={isDragging}
    >
      <span>{title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="ml-2 cursor-pointer text-sm"
      >
        <X />
      </button>
    </div>
  );
}
