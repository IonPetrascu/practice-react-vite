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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-auto flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          {...register('title')}
          placeholder="Add a card..."
          className="min-w-0 flex-1 rounded-md border border-[#606b80] bg-white px-3 py-1.5 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          <Plus size={14} />
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </div>
      {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
    </form>
  );
};

export default CardForm;
