import { useEffect } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { boardsService } from '../../services/board.service';
import BoardForm from '../../components/BoardForm/BoardForm';
import { NavLink } from 'react-router';
import { Trash2 } from 'lucide-react';

const Boards = () => {
  const { boards, setBoards, removeBoard } = useBoardStore();

  useEffect(() => {
    boardsService
      .getAll()
      .then(setBoards)
      .catch(() => setBoards([]));
  }, [setBoards]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">My Boards</h1>
      <BoardForm />
      <ul className="mt-6 flex flex-col gap-2">
        {boards.map(({ title, id }) => (
          <li
            key={id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <NavLink
              className="flex-1 font-medium text-gray-700 hover:text-blue-600"
              to={`/boards/${id}`}
              end
            >
              {title}
            </NavLink>
            <button
              onClick={() => boardsService.delete(id).then(() => removeBoard(id))}
              className="ml-3 cursor-pointer text-gray-400 transition-colors hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
        {boards.length === 0 && (
          <p className="text-center text-sm text-gray-400">No boards yet. Create one above!</p>
        )}
      </ul>
    </div>
  );
};

export default Boards;
