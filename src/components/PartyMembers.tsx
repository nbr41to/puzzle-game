import Image from 'next/image';
import { FC } from 'react';

type Prop = {
  life: number;
};

export const PartyMembers: FC<Prop> = ({ life }) => {
  const lifePercent = (life / 100) * 100;

  return (
    <div className=''>
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
        <div className='outline outline-2 outline-blue-500 rounded-full mt-0.5 bg-gray-600 overflow-hidden'>
          <div className='bg-rose-500' style={{ width: `${lifePercent}%` }}>
            <p className='text-xs font-bold pl-2 text-white whitespace-nowrap'>
              HP: {life} / 100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
