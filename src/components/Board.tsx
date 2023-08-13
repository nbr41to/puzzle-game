import { DropItem } from '@/components/DropItem';
import {
  alignCheck,
  generateDrops,
  switchDrops,
  downDrops,
  provideDrops,
} from '@/utils/drop';
import { FC, useCallback, useEffect, useReducer, useState } from 'react';
import initialBoard from '@/mocks/board.json';
import clsx from 'clsx';
import { BoardBackground } from '@/components/BoardBackground';
import { Button } from '@/components/Button';

export const Board: FC = () => {
  const [isStarted, started] = useReducer(() => true, false);
  const [movable, switchMovable] = useReducer((state) => !state, false);

  const [drops, setDrops] = useState<NullableDrop[]>(
    initialBoard.flat() as NullableDrop[],
  );
  const [draggingDrop, setDraggingDrop] = useState<Drop | null>(null);
  const [moved, setMoved] = useState(false);

  /* 初回のドロップの供給 */
  useEffect(() => {
    const newDrop = generateDrops();
    setDrops(newDrop);
  }, []);

  /* ゲーム開始 */
  const start = useCallback(() => {
    const result = downDrops(drops, 5);
    setDrops(result);
    started();
    switchMovable();
  }, [drops]);

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

  /* ドロップを下に詰める */
  const provide = () => {
    switchMovable();
    setDrops(provideDrops(drops));
  };

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

      const newDrops = switchDrops(drops, [
        draggingDrop?.position as Position,
        drop.position,
      ]);
      setDrops(newDrops);
      setDraggingDrop({
        ...draggingDrop,
        position: drop.position,
      });
    },
    [moved, draggingDrop, drops],
  );

  /* ドロップを離したとき */
  const handleOnDragEnd = useCallback(() => {
    if (!moved && draggingDrop) return;
    const newDrops = alignCheck(drops);
    setDrops(newDrops);
    setDraggingDrop(null);
    setMoved(false);
  }, [moved, draggingDrop, drops]);

  /* SP: ドロップを動かしているとき */
  const handleOnTouchMove = useCallback(
    async (e: React.TouchEvent<HTMLDivElement>) => {
      /* 重なったelementを取得 */
      const elemBelow = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY,
      ) as HTMLElement;
      if (!elemBelow) return;

      /* 重なったelementがdrop zoneでなければreturn */
      if (!elemBelow.id.startsWith('drop-')) return;

      /* 重なったelementのpositionを取得 */
      const dropZonePosition = elemBelow.id
        .split('-')
        .slice(1)
        .map((str) => Number(str)) as Position;

      /* 自分の場所ならreturn */
      if (
        draggingDrop?.position[0] === dropZonePosition[0] &&
        draggingDrop?.position[1] === dropZonePosition[1]
      )
        return;

      /* 重なったelementのonDragEnterを発火 */
      const eventHandler = () => {
        const targetDrop = drops.find(
          (drop) =>
            drop?.position[0] === dropZonePosition[0] &&
            drop?.position[1] === dropZonePosition[1],
        );
        if (!targetDrop) return;
        handleOnDragEnter(targetDrop);
      };
      elemBelow.style.pointerEvents = 'none';
      elemBelow.addEventListener('dragenter', eventHandler);
      elemBelow.dispatchEvent(new Event('dragenter'));
      elemBelow.removeEventListener('dragenter', eventHandler);
      await new Promise((resolve) => setTimeout(resolve, 200)); // animationの時間待つ
      elemBelow.style.pointerEvents = 'auto';
    },
    [draggingDrop, drops, handleOnDragEnter],
  );

  return (
    <div className='mx-auto w-fit relative'>
      <div
        id='board'
        className={clsx([
          'w-[312px] h-[260px] outline-gray-400 outline outline-1 rounded overflow-hidden',
          'relative ',
        ])}
      >
        <div>
          {drops.map(
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
        </div>
        {/* Blur */}
        {!movable && <div className='absolute w-full h-full bg-black/50' />}
        {/* Start Button */}
        {!isStarted && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Button onClick={start}>START</Button>
          </div>
        )}
        <BoardBackground />
      </div>

      <div hidden className='w-fit mx-auto mt-4'>
        <Button onClick={() => setDrops(generateDrops())}>REFRESH</Button>
      </div>
      <Button onClick={provide}>provide</Button>
    </div>
  );
};
