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

  const changeDrop = (dragId, targetId) => {
    if (!targetId || !dragId) return;
    // const drag = drops.find((drop) => {
    //   return drop.position.x === 0 && drop.position.y === 0;
    // });
    // const target = drops.find(
    //   (drop) => drop.position.x === 0 && drop.position.y === 1
    // );
    const drag = drops.find((drop) => drop.id === dragId);
    const target = drops.find((drop) => drop.id === targetId);
    const newDrops = drops.map((drop) => {
      if (drop.id === drag?.id) {
        const newDrop = { ...drop, position: target.position };
        console.log(drop);
        console.log(newDrop);
        return newDrop;
      }
      if (drop.id === target?.id) {
        const newDrop = { ...drop, position: drag.position };
        console.log(drop);
        console.log(newDrop);
        return newDrop;
      }
      return drop;
    });
    setDrops(newDrops);
  };
  console.log(drops);
  return (
    <div className='board'>
      {[0, 1, 2, 3, 4].map((i) => (
        <div className='flex' key={i}>
          {drops
            .filter((drop) => drop.position.y === i)
            .sort((a, b) => {
              if (a.position.x > b.position.x) return 1;
              if (a.position.x < b.position.x) return -1;
              return 0;
            })
            .map((drop) => (
              <Drop drop={drop} changeDrop={changeDrop} key={drop.id} />
            ))}
        </div>
      ))}
      <button onClick={changeDrop}>button</button>
    </div>
  );
};
