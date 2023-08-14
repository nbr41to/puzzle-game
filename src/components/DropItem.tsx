import { FC, memo, useState } from 'react';
import clsx from 'clsx';
import { onBoard } from '@/utils/board';

const getColorClass = (color: Color) => {
  switch (color) {
    case 'red':
      return 'bg-red-500';
    case 'green':
      return 'bg-green-500';
    case 'blue':
      return 'bg-sky-500';
    case 'light':
      return 'bg-yellow-500';
    case 'dark':
      return 'bg-purple-500';
    default:
      return '';
  }
};

type Props = {
  drop: Drop;
  active: boolean;
  isDragStarted: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
};

export const DropItem: FC<Props> = memo(
  ({
    drop,
    active,
    isDragStarted,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onTouchMove,
  }) => {
    const { color, position, align } = drop;
    const [isTouchMoving, setIsTouchMoving] = useState(false);
    const isOnBoard = onBoard(position);

    return (
      <div
        className={clsx([
          'w-[52px] h-[52px] cursor-move active:opacity-50 absolute z-0',
          'transition-all ease-in-out',
        ])}
        style={{
          top: `${position[0] * 52}px`,
          left: `${position[1] * 52}px`,
          transitionDuration: `${isDragStarted ? 100 : 500}ms`,
        }}
      >
        {/* Draggable Drop */}
        <div
          className={clsx([
            getColorClass(color),
            'rounded-full w-[48px] h-[48px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'shadow-[-4px_-2px_8px_4px_rgba(0,0,0,0.3)_inset]',
            align && 'opacity-20 animate-pulse',
            active && isTouchMoving && 'pointer-events-none',
          ])}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={(e) => {
            e.preventDefault(); // onDropを発火させるため
          }}
          /* SP対応 */
          onTouchStart={(e) => {
            setIsTouchMoving(true);
            onDragStart();
          }}
          onTouchEnd={(e) => {
            setIsTouchMoving(false);
            onDragEnd();
            /* 位置を戻す */
            const target = e.target as HTMLDivElement;
            target.style.position = 'absolute';
            target.style.top = '50%';
            target.style.left = '50%';
          }}
          onTouchMove={(e) => {
            /* 位置を動的に */
            const target = e.target as HTMLDivElement;
            const touch = e.touches[0];
            target.style.position = 'fixed';
            target.style.top = `${
              touch.pageY - window.scrollY - target.offsetHeight / 3
            }px`;
            target.style.left = `${
              touch.pageX - window.scrollX - target.offsetWidth / 3
            }px`;
            onTouchMove(e);
          }}
        >
          <div
            className={clsx([
              'w-3 h-3 bg-white/40 rounded-full top-1.5 right-2 absolute',
              'shadow-[-1px_-0.5px_4px_2px_rgba(0,0,0,0.1)_inset]',
            ])}
          />
        </div>

        {/* Drop Zone */}
        {!active && isDragStarted && isOnBoard && (
          <div
            id={`drop-${drop.position[0]}-${drop.position[1]}`}
            className={clsx([
              'w-[52px] h-[52px] z-10 absolute',
              'bg-gray-300/50', // only for debug
            ])}
            onDragEnter={onDragEnter}
            onDragOver={(e) => {
              e.preventDefault();
              // これがないとdropイベントのかわりにdragLeaveが発火して元の位置に戻ってしまう
            }}
          ></div>
        )}
      </div>
    );
  },
);
DropItem.displayName = 'DropItem';
