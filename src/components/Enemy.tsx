'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

type Prop = {
  enemy: Enemy;
  life: number;
  effect: string | null;
};

export const Enemy: FC<Prop> = ({ enemy, life, effect }) => {
  const lifePercent = (life / enemy.life) * 100;

  return (
    <div className='flex flex-col items-center justify-end fade-in'>
      <div className='h-[200px] grid place-content-end'>
        <Image
          src={enemy.imageSrc}
          className={clsx([
            effect === 'attack' && 'attack-effect',
            effect === 'hit' && 'hit-effect',
          ])}
          /* 点滅 */
          width={200}
          height={200}
          priority={true}
          alt='enemy image'
        />
      </div>
      {/* HP BAR */}
      <div className='w-4/5 outline outline-2 outline-gray-400 rounded-full mt-0.5 overflow-hidden'>
        <div
          className='bg-blue-600 h-2 transition-[width]'
          style={{ width: `${lifePercent}%` }}
        ></div>
      </div>
      <p className='text-sm mt-1'>{enemy.name}</p>
    </div>
  );
};
