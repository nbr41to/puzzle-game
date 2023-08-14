import { Button } from '@/components/Button';
import { FC } from 'react';

type Props = {};

export const GameOver: FC<Props> = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen fade-in'>
      <div className='fixed w-screen h-screen bg-black/80'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center'>
        <div className='text-4xl whitespace-nowrap'>GAME OVER</div>
        <p className='text-sm py-4'>遊んでくれてありがとう！</p>
        <Button onClick={() => window.location.reload()}>もう一度遊ぶ</Button>
      </div>
    </div>
  );
};
