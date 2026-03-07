import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { boardSchema } from './schema';
import type { BoardFormValues } from './types';
import { boardsService } from '../../services/board.service';
import { useBoardStore } from '../../store/boardStore';
import { toast } from 'sonner';

const BoardForm = () => {
  const addBoard = useBoardStore((s) => s.addBoard);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BoardFormValues>({ resolver: zodResolver(boardSchema) });

  const onSubmit: SubmitHandler<BoardFormValues> = (data) => {
    return boardsService
      .create(data)
      .then((board) => {
        addBoard({ ...board, role: 'OWNER' });
        toast.success('Доска создана');
        reset();
      })
      .catch(() => toast.error('Не удалось создать доску'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          {...register('title')}
          id="title"
          placeholder="New board name..."
          className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : '+ Create board'}
        </button>
      </div>
      {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
    </form>
  );
};

export default BoardForm;
