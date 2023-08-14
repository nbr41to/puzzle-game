import { wait } from '@/utils/wait';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

type Props = {
  score: number; // 消した数
  magnification: number; // 倍率
};

export const DamageCounter: FC<Props> = ({ score, magnification }) => {
  const damage = score * magnification;
  const [count, setCount] = useState(score);

  useEffect(() => {
    if (score === 0) return setCount(0);

    (async () => {
      /* fromからtoまでのカウントアップを1600ミリ秒で終わらせたい */
      const duration = 319;
      const interval = Math.floor(damage / duration);
      for (let i = 0; i <= damage; i += interval) {
        setCount(i);
        await wait(1);
      }
      setCount(damage);
    })();
  }, [score]);

  const counted = score !== 0 && count === damage;

  return (
    <div className='text-sm font-bold mt-1 flex items-center gap-1'>
      <span>消した数: {score}</span>
      {score !== 0 && (
        <>
          <span>×</span>
          <span className='bg-gradient-to-br from-yellow-500  to-teal-500 text-transparent bg-clip-text'>
            {magnification}
          </span>
          <span>=</span>
          <span
            className={clsx([
              'text-lg font-extrabold w-16 px-3 flex-grow text-center',
              'bg-gradient-to-br from-yellow-400 via-pink-500 to-teal-400 text-transparent bg-clip-text',
              !counted && 'damage-counting',
            ])}
          >
            {count}
          </span>
          <span>ダメージ！</span>
        </>
      )}
    </div>
  );
};
