import { useEffect } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { boardsService } from '../../services/board.service';
import BoardForm from '../../components/BoardForm/BoardForm';
import { useNavigate } from 'react-router';
import { Trash2, LayoutGrid } from 'lucide-react';

const Boards = () => {
  const { boards, setBoards, removeBoard } = useBoardStore();
  const navigate = useNavigate();

  useEffect(() => {
    boardsService
      .getAll()
      .then(setBoards)
      .catch(() => setBoards([]));
  }, [setBoards]);

  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-8 py-5">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-base font-semibold text-white">Мои доски</h1>
          <p className="mt-0.5 text-xs text-zinc-500">{boards.length} досок</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-5xl px-8 py-6">
        {/* Create form */}
        <div className="mb-8">
          <BoardForm />
        </div>

        {/* Grid */}
        {boards.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {boards.map(({ title, id }) => (
              <div
                key={id}
                className="group relative flex h-24 cursor-pointer flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                onClick={() => navigate(`/boards/${id}`)}
              >
                <LayoutGrid size={16} className="text-zinc-600 group-hover:text-zinc-400" />
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white">
                  {title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    boardsService.delete(id).then(() => removeBoard(id));
                  }}
                  className="absolute top-3 right-3 cursor-pointer text-zinc-700 opacity-0 transition-all group-hover:opacity-100 hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
              <LayoutGrid size={20} className="text-zinc-600" />
            </div>
            <p className="text-sm font-medium text-zinc-400">Досок пока нет</p>
            <p className="mt-1 text-xs text-zinc-600">Создайте первую доску выше</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Boards;
