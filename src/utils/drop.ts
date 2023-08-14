import { dropColor } from '@/constants';
import { nanoid } from 'nanoid';

/* 場所を指定してドロップを一つ生成 */
export const generateDrop = (position: Position): Drop => {
  const id = nanoid();
  const colorIndex = Math.floor(Math.random() * 5);

  return {
    id,
    color: dropColor[colorIndex],
    position,
    align: false,
  };
};

/* 指定した2つの場所のドロップを入れ替える */
export const switchDrops = (
  drops: readonly Drop[],
  positions: [Position, Position],
): Drop[] => {
  const [[r1, c1], [r2, c2]] = positions;

  const newDrops = drops.map((drop) => {
    if (drop.position[0] === r1 && drop.position[1] === c1) {
      const switchTarget = drops.find(
        (drop) => drop?.position[0] === r2 && drop?.position[1] === c2,
      );

      return switchTarget
        ? ({
            ...drop,
            position: [r2, c2],
          } as Drop)
        : drop;
    }

    if (drop.position[0] === r2 && drop.position[1] === c2) {
      const switchTarget = drops.find(
        (drop) => drop?.position[0] === r1 && drop?.position[1] === c1,
      );
      switchTarget;

      return switchTarget
        ? ({
            ...drop,
            position: [r1, c1],
          } as Drop)
        : drop;
    }

    return drop;
  });

  return newDrops;
};
