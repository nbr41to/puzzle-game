import Image from 'next/image';
import { FC } from 'react';

export const TitleLogo: FC = () => (
  <div className='h-[322px] grid place-content-center relative'>
    <h1 hidden> Puzzle and Programmings</h1>
    <div className='text-center text-teal-500 font-bold drop-shadow space-y-2'>
      <div className='text-6xl pr-28'>Puzzle</div>
      <div className='text-5xl pl-12'>and</div>
      <div className='text-5xl'>Programmings</div>
    </div>
    <Image
      className='absolute top-14 right-0'
      src='/character_program_fast.png'
      width={100}
      height={100}
      alt='character'
    />
  </div>
);
