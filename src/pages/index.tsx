import { Board } from '@/components/Board';
import { Enemy } from '@/components/Enemy';
import { PartyMembers } from '@/components/PartyMembers';
import { useEffect, useReducer, useState } from 'react';
import dummy_enemy from '@/mocks/enemies.json';
import { GameOver } from '@/components/GameOver';
import { Congratulations } from '@/components/Congratulations';
import { TitleLogo } from '@/components/TitleLogo';
import { TitleLogoEffect } from '@/components/TitleLogoEffect';
import Head from 'next/head';

/* 相手ガチャ */
const getEnemy = () => {
  const ids = [10, 5, 3, 2];
  const dice = Math.floor(Math.random() * 10);

  for (let i = 0; i < ids.length; i++) {
    if (dice % ids[i] === 0) {
      return dummy_enemy[i];
    }
  }

  return dummy_enemy[3];
};

export default function Home() {
  const [isStarted, start] = useReducer(() => true, false);
  const [myLife, setMyLife] = useState(100_000_000);
  const [enemy, setEnemy] = useState<Enemy>(dummy_enemy[0]);
  const [enemyLife, setEnemyLife] = useState(0);
  const [enemyEffect, setEnemyEffect] = useState<string | null>(null);

  useEffect(() => {
    const enm = getEnemy();
    setEnemy(enm);
    setEnemyLife(enm.life);
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
    if (enemyLife === 0) return;
    handleSetEffect('attack');
    setMyLife((prev) => (prev - enemy.attack < 0 ? 0 : prev - enemy.attack));
  };

  return (
    <>
      <Head>
        <title>Puzzle and Programming</title>
        <meta name='title' content='Puzzle and Programming' />
        <meta name='description' content='Reactでパズ◯ラ作ってみた' />
      </Head>
      <Congratulations />
      <div className='mx-auto w-fit py-4 select-none'>
        {myLife === 0 && <GameOver />}
        {enemyLife === 0 && <Congratulations />}
        <TitleLogoEffect started={isStarted} />
        <div className='space-y-4'>
          {isStarted ? (
            <>
              <Enemy enemy={enemy} life={enemyLife} effect={enemyEffect} />
              <PartyMembers life={myLife} />
            </>
          ) : (
            <TitleLogo />
          )}
          <Board
            started={isStarted}
            onStart={start}
            onAttack={handleOnAttack}
            onBeAttacked={handleOnBeAttacked}
          />
        </div>
      </div>
    </>
  );
}
