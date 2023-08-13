'use client';

import Image from 'next/image';
import { FC, useEffect, useId, useState } from 'react';
import dummy_enemies from '@/mocks/enemies.json';

type Prop = {};

export const Enemy: FC<Prop> = () => {
  const [enemyId, setEnemyId] = useState(0);
  useEffect(() => {
    const id = Math.floor(Math.random() * 2);
    setEnemyId(id);
  }, []);

  const enemy = dummy_enemies[enemyId];

  return (
    <div className='flex flex-col items-center'>
      <Image
        src={enemy.imageSrc}
        /* 点滅 */
        width={200}
        height={200}
        priority={true}
        alt='enemy image'
      />
      {/* HP BAR */}
      <div className='w-4/5 outline outline-2 outline-gray-400 rounded-full mt-0.5 overflow-hidden'>
        <div className='w-4/5 bg-blue-600 h-2'></div>
      </div>
      {/* <p>{dice ? '不服そうなじょ牛' : 'ムーノナ・ジョシー'}</p> */}
      <p className='text-sm mt-1'>{enemy.name}</p>
    </div>
  );
};
