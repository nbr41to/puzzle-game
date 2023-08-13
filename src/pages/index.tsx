import { Board } from '@/components/Board';
import { Enemy } from '@/components/Enemy';
import { PartyMembers } from '@/components/PartyMembers';

export default function Home() {
  return (
    <div className='mx-auto w-fit py-2'>
      <div className='space-y-4'>
        <h1 className='text-teal-500 font-bold text-2xl text-center drop-shadow'>
          Puzzle and Programmings
        </h1>
        <Enemy />
        <PartyMembers />
        <Board />
      </div>
    </div>
  );
}
