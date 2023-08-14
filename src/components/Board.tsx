import { DropItem } from '@/components/DropItem';
import { switchDrops } from '@/utils/drop';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { BoardBackground } from '@/components/BoardBackground';
import { Button } from '@/components/Button';
import {
  alignCheck,
  packDownDrops,
  provideStandbyDrops,
  refreshAllDrop,
  removeAlignDrops,
} from '@/utils/board';
import { wait } from '@/utils/wait';
import { useNoScrollAtBoard } from '@/utils/useNoScrollAtBoard';
import { DamageCounter } from '@/components/DamageCounter';

type Phase =
  | 'not-started' /* ゲーム開始前 */
  | 'standby' /* パズル待ち */
  | 'resolving' /* パズル中 */
  | 'checking' /* 揃っているドロップを確認 */
  | 'removing' /* 揃っているドロップを削除 */
  | 'packing' /* 消えたドロップを詰める */
  | 'attacking' /* 自分の攻撃 */
  | 'be-attacked' /* 相手の攻撃 */;

type Props = {
  started: boolean;
  onStart: () => void;
  onAttack: (amount: number) => void;
  onBeAttacked: () => void;
};
export const Board: FC<Props> = ({
  started,
  onStart,
  onAttack,
  onBeAttacked,
}) => {
  const [phase, setPhase] = useState<Phase>('not-started');
  const [drops, setDrops] = useState<Drop[]>([]);
  const [draggingDrop, setDraggingDrop] = useState<Drop | null>(null);
  const [score, setScore] = useState(0);
  const isResolving = useMemo(() => phase === 'resolving', [phase]);
  const movable = useMemo(
    () => phase === 'standby' || phase === 'resolving',
    [phase],
  );
  useNoScrollAtBoard();
  console.log(phase);

  /* Phaseの変更時のトリガー */
  useEffect(() => {
    (async () => {
      switch (phase) {
        case 'not-started':
          setDrops(provideStandbyDrops());
          setPhase('standby');
          break;
        case 'standby':
          break;
        case 'resolving':
          setScore(0);
          break;
        case 'checking':
          await wait();
          const { newDrops, amount } = alignCheck(drops);
          if (amount > 0) {
            setScore((prev) => prev + amount);
            setDrops(newDrops);
            setPhase('removing');
          } else if (score > 0) {
            setPhase('attacking');
          } else {
            setPhase('be-attacked');
          }
          await wait(200);
          break;
        case 'removing':
          await wait(800);
          setDrops(removeAlignDrops(drops));
          setPhase('packing');
          break;
        case 'packing':
          await wait(300);
          setDrops(packDownDrops(drops));
          setPhase('checking');
          break;
        case 'attacking':
          await wait(800);
          onAttack(score);
          setPhase('be-attacked');
          break;
        case 'be-attacked':
          await wait(800);
          onBeAttacked();
          setPhase('standby');
          break;
        default:
          break;
      }
    })();
  }, [phase, drops, onAttack, onBeAttacked, score]);

  /**
   * ゲームの開始
   */
  const handleOnStart = useCallback(() => {
    onStart();
    setDrops(refreshAllDrop(drops));
  }, [onStart, drops]);

  /**
   * ドラッグしたドロップが他のドロップエリアに進入したとき
   */
  const handleOnDragEnter = useCallback(
    async (targetDrop: Drop) => {
      console.log('drag enter');
      console.log(draggingDrop);
      console.log(targetDrop);
      if (!draggingDrop) return;
      if (!isResolving) setPhase('resolving');
      setDrops(
        switchDrops(drops, [draggingDrop.position, targetDrop.position]),
      );
      setDraggingDrop({
        ...draggingDrop,
        position: targetDrop.position,
      });
      // await new Promise((resolve) => setTimeout(resolve, 100)); // animationの時間待つ
    },
    [draggingDrop, drops, isResolving],
  );

  /**
   * ドロップを離したとき
   */
  const handleOnDragEnd = useCallback(() => {
    if (!draggingDrop) return;
    if (isResolving) {
      setDraggingDrop(null);
      setPhase('checking');
    } else {
      setDraggingDrop(null);
    }
  }, [isResolving, draggingDrop]);

  /**
   * SP: ドロップを動かしているとき
   */
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
      await new Promise((resolve) => setTimeout(resolve, 100)); // animationの時間待つ
      elemBelow.style.pointerEvents = 'auto';
    },
    [draggingDrop, drops, handleOnDragEnter],
  );

  return (
    <div className='mx-auto w-fit relative'>
      <div
        id='board'
        className={clsx([
          'w-[312px] h-[260px] outline-gray-400 outline outline-1 rounded relative',
          'overflow-hidden', // OFFで待機ボードを可視化
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
                  isDragStarted={draggingDrop !== null}
                  onDragStart={() => setDraggingDrop(drop)}
                  onDragEnd={handleOnDragEnd}
                  onDragEnter={() => handleOnDragEnter(drop)}
                  onTouchMove={handleOnTouchMove}
                />
              ),
          )}
        </div>
        {/* Blur */}
        {!movable && <div className='absolute w-full h-full bg-black/20' />}
        {/* Start Button */}
        {!started && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Button onClick={handleOnStart}>START</Button>
          </div>
        )}
        <BoardBackground />
      </div>
      {started && (
        <div className='mt-1'>
          <DamageCounter score={score} magnification={4096} />
        </div>
      )}
    </div>
  );
};
