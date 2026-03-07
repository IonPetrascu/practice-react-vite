import { X } from 'lucide-react';
type Props = {
  onDelete: () => void;
  title: string;
  cardCount: number;
};

export default function ColumnHeader({ onDelete, title, cardCount }: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#606b80] p-3">
      <div className="flex items-center gap-3.5">
        <div className="h-2.5 w-2.5 rounded-sm border border-[#0891b2] bg-[#06B6D4]"></div>
        <span>{title}</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#606b80]">
          {cardCount}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button className="cursor-pointer" onClick={onDelete}>
          <X width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
