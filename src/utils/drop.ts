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
  };
};

/* 盤面を生成 */
export const generateDrops = (current?: NullableDrop[]): NullableDrop[] => {
  // const isInitial = !current;
  const board = dropsToBoard(current ?? []);
  const newBoard: Board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  // for (let row = 0; row < 5; row++) {
  //   for (let column = 0; column < 6; column++) {
  //     const drop = generateDrop([isInitial ? row - 5 : row, column]);
  //     newDrops.push(drop);
  //   }
  // }
  /* nullにDropを供給 */
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      if (board[row][column] === null) {
        newBoard[row][column] = generateDrop([row - 5, column]);
      }
    }
  }

  return newBoard.flat();
};

/* 指定した2つの場所のドロップを入れ替える */
export const switchDrops = (
  drops: readonly NullableDrop[],
  positions: [Position, Position],
): NullableDrop[] => {
  const [[r1, c1], [r2, c2]] = positions;

  const newDrops: NullableDrop[] = drops.map((drop) => {
    if (drop === null) return null;
    if (drop.position[0] === r1 && drop.position[1] === c1) {
      const switchTarget = drops.find(
        (drop) => drop?.position[0] === r2 && drop?.position[1] === c2,
      );

      return switchTarget
        ? {
            ...drop,
            position: [r2, c2],
          }
        : null;
    }

    if (drop.position[0] === r2 && drop.position[1] === c2) {
      const switchTarget = drops.find(
        (drop) => drop?.position[0] === r1 && drop?.position[1] === c1,
      );

      return switchTarget
        ? {
            ...drop,
            position: [r1, c1],
          }
        : null;
    }

    return drop;
  });

  return newDrops as NullableDrop[];
};

/* 縦or横の1列で揃っているドロップのindexを返す */
const getMatchDropIndexes = (line: readonly Drop[]): number[] => {
  const resultSet = new Set<number>();
  const colors = line.map((drop) => drop.color);

  for (let i = 0; i < line.length - 2; i++) {
    const color = colors[i];
    if (color === colors[i + 1] && color === colors[i + 2]) {
      resultSet.add(i);
      resultSet.add(i + 1);
      resultSet.add(i + 2);
    }
  }

  const result: number[] = [];
  resultSet.forEach((index) => {
    result.push(index);
  });

  return result;
};

/* NullableDrop[] to Board */
export const dropsToBoard = (drops: readonly NullableDrop[]): Board => {
  const board: Board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  drops.forEach((drop) => {
    if (drop === null) return;
    const [row, column] = drop.position;
    board[row][column] = drop;
  });

  return board;
};

/* 盤面の揃っているドロップをnullにする */
export const alignCheck = (drops: readonly NullableDrop[]): NullableDrop[] => {
  /* nullがないかチェック */
  if (drops.some((drop) => drop === null)) {
    alert('board has null');

    return drops as NullableDrop[];
  }

  const board = dropsToBoard(drops);

  const removePositions = new Set<Position>();

  /* 横 */
  for (let row = 0; row < 5; row++) {
    const columns = board[row] as Drop[];
    const matchedColumns = getMatchDropIndexes(columns);
    if (matchedColumns.length > 0) {
      matchedColumns.forEach((column) => {
        removePositions.add([row, column]);
      });
    }
  }
  /* 縦 */
  for (let column = 0; column < 6; column++) {
    const rows = board.map((row) => row[column]) as Drop[];
    const matchedRows = getMatchDropIndexes(rows);
    if (matchedRows.length > 0) {
      matchedRows.forEach((row) => {
        removePositions.add([row, column]);
      });
    }
  }

  const newBoard = [...board];
  removePositions.forEach((position) => {
    newBoard[position[0]][position[1]] = null;
  });

  return newBoard.flat();
};

/* ドロップが消えた後, 下に詰める */
export const provideDrops = (
  drops: readonly NullableDrop[],
): NullableDrop[] => {
  const board = dropsToBoard(drops);
  console.log(board.map((row) => row.map((drop) => drop?.color)));

  const newBoard: NullableDrop[][] = [[], [], [], [], []];

  for (let column = 0; column < 6; column++) {
    const rows = board.map((row) => row[column]) as Drop[]; // 縦一列
    console.log(column, 'rows', rows);
    const nullCount = rows.filter((drop) => drop === null).length;
    const newRows: NullableDrop[] = rows
      .filter((drop) => drop !== null)
      .map((drop, index) => {
        return {
          ...drop,
          position: [index + nullCount, column],
        };
      });
    console.log(newRows.map((drop) => drop?.color));
    /* 5つになるまでnullを追加 */
    for (let i = 0; i < nullCount; i++) {
      newRows.unshift(null);
    }
    console.log(newRows.map((drop) => drop?.color));
    newRows.forEach((drop, index) => {
      newBoard[index][column] = drop;
    });
  }
  /* nullにDropを供給 */
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      if (newBoard[row][column] === null) {
        newBoard[row][column] = generateDrop([row, column]);
      }
    }
  }

  return newBoard.flat();
};

/* Down all drop */
export const downDrops = (
  drops: readonly NullableDrop[],
  distance = 1,
): NullableDrop[] => {
  const newDrops = [
    ...drops.map((drop) => ({
      ...drop,
      position: [drop!.position[0] + distance, drop!.position[1]],
    })),
  ];

  return newDrops as NullableDrop[];
};
