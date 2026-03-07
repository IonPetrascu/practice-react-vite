import { DragDropProvider } from '@dnd-kit/react';
import { useEffect, useRef, useState } from 'react';
import ColumnComponent from '../../components/Column';
import { useParams } from 'react-router';
import { boardsService } from '../../services/board.service';
import type { Card, Column } from '../../types/board';
import ColumnForm from '../../components/ColumnForm/ColumnForm';
import { move } from '@dnd-kit/helpers';
import { cardService } from '../../services/card.service';
import { columnService } from '../../services/column.service';
import CardComponent from '../../components/Card';

const Board = () => {
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [cardsByColumn, setCardsByColumn] = useState<Record<string, Card[]>>({});
  const [columnTitles, setColumnTitles] = useState<Record<number, string>>({});

  const cardsByColumnRef = useRef<Record<string, Card[]>>({});
  const dragStartCardsRef = useRef<Record<string, Card[]>>({});
  const columnOrderRef = useRef<string[]>([]);

  const { id } = useParams();
  const boardId = Number(id);

  useEffect(() => {
    boardsService.getById(boardId).then((data) => {
      const ids = data.columns.map((c) => `col-${c.id}`);
      const cards: Record<string, Card[]> = {};
      const titles: Record<number, string> = {};
      columnOrderRef.current = ids;
      setColumnOrder(ids);

      data.columns.forEach((col) => {
        titles[col.id] = col.title;
        cards[`col-${col.id}`] = col.cards;
      });
      setColumnTitles(titles);
      setColumnOrder(ids);
      setCardsByColumn(cards);
    });
  }, [id, boardId]);

  useEffect(() => {
    cardsByColumnRef.current = cardsByColumn;
  }, [cardsByColumn]);

  const handleColumnCreated = (column: Column) => {
    const newKey = `col-${column.id}`;
    columnOrderRef.current = [...columnOrderRef.current, newKey];
    setColumnOrder((prev) => [...prev, `col-${column.id}`]);
    setColumnTitles((prev) => ({ ...prev, [column.id]: column.title }));
    setCardsByColumn((prev) => ({ ...prev, [`col-${column.id}`]: [] }));
  };

  const handleCardCreated = (colId: number, card: Card) => {
    setCardsByColumn((prev) => ({
      ...prev,
      [`col-${colId}`]: [...(prev[`col-${colId}`] ?? []), card],
    }));
  };

  const handleColumnDeleted = (colKey: string, colId: number) => {
    columnService.remove(boardId, colId).then(() => {
      columnOrderRef.current = columnOrderRef.current.filter((k) => k !== colKey);
      setColumnOrder((prev) => prev.filter((k) => k !== colKey));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setColumnTitles(({ [colId]: _, ...rest }) => rest);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setCardsByColumn(({ [colKey]: _, ...rest }) => rest);
    });
  };

  const handleCardDeleted = (colKey: string, colId: number, cardId: number) => {
    cardService.remove(boardId, colId, cardId).then(() => {
      setCardsByColumn((prev) => ({
        ...prev,
        [colKey]: prev[colKey].filter((c) => c.id !== cardId),
      }));
    });
  };

  return (
    <>
      {id && <ColumnForm boardId={boardId} onSuccess={handleColumnCreated} />}
      <DragDropProvider
        onDragOver={(event) => {
          const { source } = event.operation;

          if (source?.type === 'column') {
            const newOrder = move(columnOrderRef.current, event);
            columnOrderRef.current = newOrder;
            setColumnOrder(newOrder);
            return;
          }

          setCardsByColumn((cards) => move(cards, event));
        }}
        onDragStart={() => {
          dragStartCardsRef.current = { ...cardsByColumnRef.current };
        }}
        onDragEnd={(event) => {
          if (event.canceled) return;
          const { source } = event.operation;
          if (!source) return;

          if (source?.type === 'column') {
            const colKey = source.id as string;
            const colId = Number(colKey.replace('col-', ''));
            const newIndex = columnOrderRef.current.indexOf(colKey);
            columnService.update(boardId, colId, { position: newIndex });
            return;
          }

          if (source.type === 'item') {
            const cards = cardsByColumnRef.current;

            // Найти новую колонку и позицию
            let newColKey: string | null = null;
            let newPosition = 0;
            for (const [colKey, colCards] of Object.entries(cards)) {
              const idx = colCards.findIndex((c) => c.id === source.id);
              if (idx !== -1) {
                newColKey = colKey;
                newPosition = idx;
                break;
              }
            }

            // Найти оригинальную колонку
            let originalColKey: string | null = null;
            for (const [colKey, colCards] of Object.entries(dragStartCardsRef.current)) {
              if (colCards.some((c) => c.id === source.id)) {
                originalColKey = colKey;
                break;
              }
            }

            if (originalColKey && newColKey) {
              const originalColId = Number(originalColKey.replace('col-', ''));
              const newColId = Number(newColKey.replace('col-', ''));
              cardService.update(boardId, originalColId, source.id as number, {
                position: newPosition,
                ...(newColId !== originalColId && { columnId: newColId }),
              });
            }
          }
        }}
      >
        <div className="flex items-start gap-3 overflow-auto bg-gray-100 p-3">
          {columnOrder.map((colKey, colIndex) => {
            const colId = Number(colKey.replace('col-', ''));
            return (
              <ColumnComponent
                key={colKey}
                id={colKey}
                title={columnTitles[colId] ?? ''}
                index={colIndex}
                boardId={boardId}
                onCardCreated={(card) => handleCardCreated(colId, card)}
                onDelete={() => handleColumnDeleted(colKey, colId)}
                cardCount={cardsByColumn[colKey].length}
              >
                <div className="flex flex-col gap-2">
                  {(cardsByColumn[colKey] ?? []).map((card, cardIndex) => (
                    <CardComponent
                      key={card.id}
                      id={card.id}
                      index={cardIndex}
                      column={colKey}
                      title={card.title}
                      onDelete={() => handleCardDeleted(colKey, colId, card.id)}
                    />
                  ))}
                </div>
              </ColumnComponent>
            );
          })}
        </div>
      </DragDropProvider>
    </>
  );
};

export default Board;
