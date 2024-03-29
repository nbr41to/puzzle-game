import { TitleLogo } from '@/components/TitleLogo';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  started: boolean;
};

export const TitleLogoEffect: FC<Props> = ({ started }) => {
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
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
          <TitleLogo />
        </div>
        <div className='absolute top-52 left-0 w-full h-4 bg-black/20' />
      </div>
    </div>
  );
};
