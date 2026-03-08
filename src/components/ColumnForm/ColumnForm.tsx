import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { columnSchema } from './schema';
import type { ColumnFormValues } from './types';
import { columnService } from '../../services/column.service';
import type { Column } from '../../types/board';
import { Plus } from 'lucide-react';

type Props = {
  boardId: number;
  onSuccess: (column: Column) => void;
};

const ColumnForm = ({ boardId, onSuccess }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ColumnFormValues>({ resolver: zodResolver(columnSchema) });

  const onSubmit: SubmitHandler<ColumnFormValues> = (data) => {
    return columnService.create(boardId, data).then((column) => {
      onSuccess(column);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          {...register('title')}
          id="col-title"
          placeholder="Название колонки..."
          className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white transition outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20"
        />
        <button
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium whitespace-nowrap text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={14} />
          {isSubmitting ? 'Создание...' : 'Добавить колонку'}
        </button>
      </div>
      {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
    </form>
  );
};

export default ColumnForm;
