import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { cardSchema } from './schema';
import type { CardFormValues } from './types';
import { cardService } from '../../services/card.service';
import type { Card } from '../../types/board';
import { Plus } from 'lucide-react';

type Props = {
  boardId: number;
  columnId: number;
  onSuccess: (card: Card) => void;
};

const CardForm = ({ boardId, columnId, onSuccess }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CardFormValues>({ resolver: zodResolver(cardSchema) });

  const onSubmit: SubmitHandler<CardFormValues> = (data) => {
    return cardService.create(boardId, columnId, data).then((card) => {
      onSuccess(card);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-1 flex flex-col gap-1">
      <div className="flex gap-1.5">
        <input
          {...register('title')}
          placeholder="Добавить карточку..."
          className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 text-xs text-white transition outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/20"
        />
        <button
          disabled={isSubmitting}
          className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-zinc-300 transition hover:bg-zinc-700 hover:text-white disabled:opacity-50"
        >
          <Plus size={14} />
        </button>
      </div>
      {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
    </form>
  );
};

export default CardForm;
