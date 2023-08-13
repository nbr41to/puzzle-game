import Image from 'next/image';
import { FC } from 'react';

type Prop = {};

export const PartyMembers: FC<Prop> = () => {
  return (
    <div className=''>
      <div className='flex justify-between'>
        <Image
          className='border-2 border-red-500 bg-red-200 rounded'
          src='/computer_hacker_white1_woman.png'
          width={48}
          height={48}
          alt='party member 1 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded'
          src='/computer_hacker_black1.png'
          width={48}
          height={48}
          alt='party member 2 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded'
          src='/computer_hacker_black1.png'
          width={48}
          height={48}
          alt='party member 3 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded'
          src='/computer_hacker_black_syuudan.png'
          width={48}
          height={48}
          alt='party member 4 image'
        />
        <Image
          className='border-2 border-violet-500 bg-violet-200 rounded'
          src='/computer_hacker_black_syuudan.png'
          width={48}
          height={48}
          alt='party member 5 image'
        />
        <Image
          className='border-2 border-red-500 bg-red-200 rounded'
          src='/computer_hacker_white1_woman.png'
          width={48}
          height={48}
          alt='party member 6 image'
        />
      </div>
      <div className='w-full mt-2'>
        <div className='outline outline-2 outline-blue-500 rounded-full mt-0.5 bg-gray-600 overflow-hidden'>
          <div className='w-8 bg-rose-500'>
            <p className='text-xs font-bold pl-2 text-white whitespace-nowrap'>
              HP: 12 / 100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
