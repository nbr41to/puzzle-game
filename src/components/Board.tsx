import { DropItem } from '@/components/DropItem';
import { alignCheck, downDrops, switchDrops } from '@/utils/drop';
import { FC, useCallback, useEffect, useState } from 'react';
import initialBoard from '@/mocks/board.json';
import clsx from 'clsx';
import { BoardBackground } from '@/components/BoardBackground';

export const Board: FC = () => {
  const [boardState, setBoardState] = useState<Board>(initialBoard as Board);
  const [draggingDrop, setDraggingDrop] = useState<Drop | null>(null);
  const [moved, setMoved] = useState(false);

  /* touch したときに scroll を無効 */
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const board = document.getElementById('board');
    if (!board) return;
    board.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      board.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  /* boardにnullがある場合に下に詰める */
  const downdrops = () => {
    if (boardState.flat().every((drop) => drop !== null)) return;
    const newBoard = downDrops(boardState);
    console.log(newBoard.map((row) => row.map((drop) => drop?.color)));
    setBoardState(newBoard);
  };

  /* ドロップを下に詰める */
  // useEffect(() => {
  //   {
  //     (async () => {
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       downdrops();
  //     })();
  //   }
  // }, [moved]);

  /* ドラッグしたドロップが他のドロップエリアに進入したとき */
  const handleOnDragEnter = useCallback(
    (drop: Drop) => {
      if (!draggingDrop) return;
      if (!moved) setMoved(true);

      const switchedBoard = switchDrops(boardState, [
        draggingDrop?.position as Position,
        drop.position,
      ]);
      setBoardState(switchedBoard);
      setDraggingDrop({
        ...draggingDrop,
        position: drop.position,
      });
    },
    [moved, draggingDrop, boardState],
  );

  /* ドロップを離したとき */
  const handleOnDragEnd = useCallback(() => {
    console.log('handleOnDragEnd', moved, draggingDrop);
    if (!moved && draggingDrop) return;
    const newBoard = alignCheck(boardState);
    setBoardState(newBoard);
    setDraggingDrop(null);
    setMoved(false);
  }, [moved, draggingDrop, boardState]);

  /* SP: ドロップを動かしているとき */
  const handleOnTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      /* 重なったelementを取得 */
      const elemBelow = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY,
      );
      if (!elemBelow) return;

      /* 重なったelementがdrop zoneでなければreturn */
      if (!elemBelow.id.startsWith('drop-')) return;

      /* 重なったelementのpositionを取得 */
      const dropZonePosition = elemBelow.id
        .split('-')
        .slice(1)
        .map((str) => Number(str)) as Position;
      console.log(dropZonePosition);

      /* 自分の場所ならreturn */
      if (
        draggingDrop?.position[0] === dropZonePosition[0] &&
        draggingDrop?.position[1] === dropZonePosition[1]
      )
        return;

      /* 重なったelementのonDragEnterを発火 */
      const eventHandler = () => {
        console.log('handleOnTouchMove EventListener');
        handleOnDragEnter(
          boardState[dropZonePosition[0]][dropZonePosition[1]] as Drop,
        );
      };
      elemBelow.addEventListener('dragenter', eventHandler);
      elemBelow.dispatchEvent(new Event('dragenter'));
      elemBelow.removeEventListener('dragenter', eventHandler);
    },
    [draggingDrop, boardState, handleOnDragEnter],
  );

  return (
    <div className='mx-auto w-fit relative'>
      <button
        onClick={() => {
          console.log('refreshBoard');
          const switchedBoard = switchDrops(boardState, [
            [2, 3],
            [2, 4],
          ]);

          console.log(
            switchedBoard.map((row) => row.map((drop) => drop?.color)),
          );
          setBoardState((prev) =>
            switchDrops(prev, [
              [2, 3],
              [2, 4],
            ]),
          );
        }}
      >
        SWITCH TEST
      </button>
      <div
        id='board'
        className={clsx([
          'w-[312px] h-[260px] outline-gray-400 outline outline-1 rounded overflow-hidden',
          'relative select-none',
        ])}
      >
        {boardState
          .flat()
          .map(
            (drop) =>
              drop !== null && (
                <DropItem
                  key={drop.id}
                  drop={drop}
                  active={draggingDrop?.id === drop.id}
                  moving={draggingDrop !== null}
                  onDragStart={() => setDraggingDrop(drop)}
                  onDragEnd={handleOnDragEnd}
                  onDragEnter={() => handleOnDragEnter(drop)}
                  onTouchMove={handleOnTouchMove}
                />
              ),
          )}
        <BoardBackground />
      </div>
    </div>
  );
};
