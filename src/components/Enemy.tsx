import Image from 'next/image';
import { FC } from 'react';

type Prop = {};

export const Enemy: FC<Prop> = () => {
  const dice = Math.floor(Math.random() * 2);
  return (
    <div className='flex flex-col items-center'>
      <p></p>
      <Image
        src={dice ? '/animal_bull_kowai.png' : '/leader_ibaru.png'}
        /* 点滅 */
        width={240}
        height={240}
        alt='enemy image'
      />
      <div className='w-full'>
        <p className='text-xs font-bold'>HP: 80 / 100</p>
        <div className='outline outline-2 outline-gray-400 rounded-full mt-0.5 overflow-hidden'>
          <div className='w-4/5 bg-blue-600 h-2'></div>
        </div>
      </div>
      <div className='text-sm mt-1'>
        <p>ATK: 10</p>
      </div>
    </div>
  );
};
