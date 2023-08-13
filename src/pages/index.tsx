import { Board } from '@/components/Board';
import { Enemy } from '@/components/Enemy';
import { PartyMembers } from '@/components/PartyMembers';
import Image from 'next/image';
import { useReducer } from 'react';

export default function Home() {
  const [isStarted, start] = useReducer(() => true, false);

  return (
    <div className='mx-auto w-fit py-4 select-none'>
      <div className='space-y-4'>
        {isStarted ? (
          <Enemy />
        ) : (
          <div className='h-[234px] grid place-content-center relative'>
            <h1 hidden> Puzzle and </h1>
            <div className='text-center text-teal-500 font-bold drop-shadow'>
              <div className='text-5xl pr-24'>Puzzle</div>
              <div className='text-3xl pl-8'>and</div>
              <div className='text-4xl pl-2'>Programmings</div>
            </div>
            <Image
              className='absolute top-8 right-3'
              src='/character_program_fast.png'
              width={100}
              height={100}
              alt='character'
            />
          </div>
        )}
        <PartyMembers />
        <Board started={isStarted} onStart={start} />
      </div>
    </div>
  );
}
