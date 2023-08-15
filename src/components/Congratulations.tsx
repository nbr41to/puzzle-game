import { Button } from '@/components/Button';
import { Confetti } from '@/components/Confetti';
import { FC } from 'react';

type Props = {};

export const Congratulations: FC<Props> = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen fade-in'>
      <div className='fixed w-screen h-screen bg-white/70'></div>
      <div className='absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 font-bold text-center'>
        <div className='animate-bounce text-4xl bg-gradient-to-br from-yellow-400 via-pink-500 to-teal-500 text-transparent bg-clip-text'>
          Congratulations!!
        </div>
        <p className='text-sm py-4'>遊んでくれてありがとう！</p>
        <Button onClick={() => window.location.reload()}>もう一度遊ぶ</Button>
      </div>
      <Confetti />
    </div>
  );
};
