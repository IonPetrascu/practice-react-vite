import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { columnSchema } from './schema';
import type { ColumnFormValues } from './types';
import { columnService } from '../../services/column.service';
import type { Column } from '../../types/board';

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 p-3">
      <div className="flex gap-2">
        <input
          {...register('title')}
          id="col-title"
          placeholder="Column title..."
          className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : '+ Add column'}
        </button>
      </div>
      {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
    </form>
  );
};

export default ColumnForm;
