import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Board } from '../types/board';

type BoardState = {
  boards: Board[];
  isLoading: boolean;
  setBoards: (boards: Board[]) => void;
  addBoard: (board: Board) => void;
  updateBoard: (id: number, data: Partial<Board>) => void;
  removeBoard: (id: number) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useBoardStore = create<BoardState>()(
  devtools(
    (set) => ({
      boards: [],
      isLoading: false,
      setBoards: (boards) => set({ boards }, false, 'setBoards'),
      addBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] }), false, 'addBoard'),
      updateBoard: (id, data) =>
        set(
          (state) => ({ boards: state.boards.map((b) => (b.id === id ? { ...b, ...data } : b)) }),
          false,
          'updateBoard',
        ),
      removeBoard: (id) =>
        set((state) => ({ boards: state.boards.filter((b) => b.id !== id) }), false, 'removeBoard'),
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
    }),
    { name: 'boardStore' },
  ),
);
