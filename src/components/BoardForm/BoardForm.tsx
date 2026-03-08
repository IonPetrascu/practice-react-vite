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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          {...register('title')}
          id="title"
          placeholder="Название новой доски..."
          className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white transition outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20"
        />
        <button
          disabled={isSubmitting}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Создание...' : '+ Создать'}
        </button>
      </div>
      {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
    </form>
  );
};

export default BoardForm;
