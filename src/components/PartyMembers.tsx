import Image from 'next/image';
import { FC } from 'react';

type Prop = {
  life: number;
};

export const PartyMembers: FC<Prop> = ({ life }) => {
  const maxLife = 100_000_000;
  const lifePercent = (life / maxLife) * 100;

  return (
    <div className='fade-in'>
      <div className='flex justify-between'>
        <Image
          className='border-2 border-red-500 bg-red-200 rounded active:scale-105'
          src='/computer_hacker_white1_woman.png'
          width={48}
          height={48}
          priority={true}
          alt='party member 1 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded active:scale-105'
          src='/computer_hacker_black1.png'
          width={48}
          height={48}
          priority={true}
          alt='party member 2 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded active:scale-105'
          src='/computer_hacker_black1.png'
          width={48}
          height={48}
          priority={true}
          alt='party member 3 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded active:scale-105'
          src='/computer_hacker_black_syuudan.png'
          width={48}
          height={48}
          priority={true}
          alt='party member 4 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded active:scale-105'
          src='/computer_hacker_black_syuudan.png'
          width={48}
          height={48}
          priority={true}
          alt='party member 5 image'
        />
        <Image
          className='border-2 border-red-500 bg-red-200 rounded active:scale-105'
          src='/computer_hacker_white1_woman.png'
          width={48}
          height={48}
          priority={true}
          alt='party member 6 image'
        />
      </div>
      <div className='w-full mt-2'>
        <div className='outline outline-2 outline-blue-500 rounded-full mt-0.5 bg-gray-600 overflow-hidden relative'>
          <div className='absolute w-full text-xs font-bold px-2 text-white whitespace-nowrap flex justify-between'>
            <div>HP</div>
            <div>
              {life.toLocaleString()} / {maxLife.toLocaleString()}
            </div>
          </div>
          <div
            className='bg-rose-500 transition-[width] h-4'
            style={{ width: `${lifePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
