import { useEffect, useState } from 'react';
import { nanoid, customAlphabet } from 'nanoid';
import { Drop } from './Drop';

const dropColors = ['red', 'blue', 'green', 'yellow', 'pink'];

const randomColor = () => {
  const nanoid = customAlphabet('01234', 1);
  return dropColors[nanoid()];
};

export const Board = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const initialDrops = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 6; j++) {
        initialDrops.push({
          id: nanoid(8),
          color: randomColor(),
          position: { x: j, y: i },
          linking: [],
        });
      }
    }
    setDrops(initialDrops);
  }, []);

  const changeDrop = (moveId, id) => {};

  return (
    <div className='board'>
      {[0, 1, 2, 3, 4].map((i) => (
        <div className='flex'>
          {drops
            .filter((drop) => drop.position.y === i)
            .map((drop) => (
              <Drop drop={drop} />
            ))}
        </div>
      ))}
    </div>
  );
};
