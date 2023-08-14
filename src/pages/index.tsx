import { Board } from '@/components/Board';
import { Enemy } from '@/components/Enemy';
import { PartyMembers } from '@/components/PartyMembers';
import Image from 'next/image';
import { useEffect, useReducer, useState } from 'react';
import dummy_enemy from '@/mocks/enemies.json';
export default function Home() {
  const [isStarted, start] = useReducer(() => true, false);
  const [myLife, setMyLife] = useState(100);
  const [enemy, setEnemy] = useState<Enemy>(dummy_enemy[0]);
  const [enemyLife, setEnemyLife] = useState(0);
  const [enemyEffect, setEnemyEffect] = useState<string | null>(null);

  useEffect(() => {
    const id = Math.floor(Math.random() * 2);
    setEnemy(dummy_enemy[id]);
    setEnemyLife(dummy_enemy[id].life);
  }, []);

  const handleSetEffect = (effect: string) => {
    setEnemyEffect(effect);
    setTimeout(() => setEnemyEffect(null), 1000);
  };

  const handleOnAttack = (amount: number) => {
    handleSetEffect('hit');
    setEnemyLife((prev) => (prev - amount < 0 ? 0 : prev - amount));
  };

  const handleOnBeAttacked = () => {
    handleSetEffect('attack');
    setMyLife((prev) => (prev - 25 < 0 ? 0 : prev - 25));
  };

  return (
    <div className='mx-auto w-fit py-4 select-none'>
      <div className='space-y-4'>
        {isStarted ? (
          <Enemy enemy={enemy} life={enemyLife} effect={enemyEffect} />
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
        <PartyMembers life={myLife} />
        <Board
          started={isStarted}
          onStart={start}
          onAttack={handleOnAttack}
          onBeAttacked={handleOnBeAttacked}
        />
      </div>
    </div>
  );
}
