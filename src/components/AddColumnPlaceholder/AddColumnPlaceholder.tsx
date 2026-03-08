import { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { columnService } from '@/services/column.service';
import type { AddColumnPlaceholderProps } from './types';

export default function AddColumnPlaceholder({ boardId, onSuccess }: AddColumnPlaceholderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);

    columnService
      .create(boardId, { title: title.trim() })
      .then((column) => {
        onSuccess(column);
        setTitle('');
        setIsEditing(false);
      })
      .catch(console.error)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleCancel = () => {
    setTitle('');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleCancel();
  };

  if (isEditing) {
    return (
      <div className="flex w-64 min-w-64 flex-col gap-2 rounded-xl border border-zinc-700 bg-zinc-900 p-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Название колонки..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="flex-1 cursor-pointer rounded-md bg-white px-3 py-1.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Создание...' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer rounded-md border border-zinc-700 p-1.5 text-zinc-400 transition hover:border-zinc-500 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="group flex w-64 min-w-64 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-3 text-zinc-500 transition-colors hover:border-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
      style={{ minHeight: '80px' }}
    >
      <div className="flex items-center gap-2">
        <Plus size={18} className="transition-transform group-hover:scale-110" />
        <span className="text-sm font-medium">Добавить колонку</span>
      </div>
    </button>
  );
}
