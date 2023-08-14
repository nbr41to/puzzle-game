import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  started: boolean;
};

export const TitleLogo: FC<Props> = ({ started }) => {
  return (
    <div
      className={clsx([
        'w-[312px] h-[234px] grid place-content-center absolute top-4 left-1/2 -translate-x-1/2',
      ])}
    >
      <h1 hidden> Puzzle and Programmings</h1>
      <div
        className={clsx([
          'absolute top-0 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-0 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-0 left-0 w-full h-4' />
      </div>
      <div
        className={clsx([
          'absolute top-4 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-4 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-4 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-8 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-8 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-8 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-12 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-12 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-12 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-16 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-16 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-16 left-0 w-full h-4 bg-black/80' />
      </div>
      <div
        className={clsx([
          'absolute top-20 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-20 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-20 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-24 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-24 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-24 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-28 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-28 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-28 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-32 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-32 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-32 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-36 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-36 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-36 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-40 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-40 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-40 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-44 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-44 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-44 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-48 w-full h-4 overflow-hidden',
          started && 'fade-out-left',
        ])}
      >
        <div className='absolute -top-48 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-48 left-0 w-full h-4 bg-black/20' />
      </div>
      <div
        className={clsx([
          'absolute top-52 w-full h-4 overflow-hidden',
          started && 'fade-out-right',
        ])}
      >
        <div className='absolute -top-52 left-0 w-full'>
          <BaseTitleLogo />
        </div>
        <div className='absolute top-52 left-0 w-full h-4 bg-black/20' />
      </div>
    </div>
  );
};

export const BaseTitleLogo = () => (
  <div className='h-[322px] grid place-content-center relative'>
    <h1 hidden> Puzzle and Programmings</h1>
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
);
