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
export const refreshBoard = (): Board => {
  const board: Board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];

  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      const drop = generateDrop([row, column]);
      board[row][column] = drop;
    }
  }

  return board;
};

/* 指定した2つの場所のドロップを入れ替える */
export const switchDrops = (
  board: Board,
  positions: [Position, Position],
): Board => {
  const drop1 = board[positions[0][0]][positions[0][1]];
  const drop2 = board[positions[1][0]][positions[1][1]];
  const newBoard = [...board];
  newBoard[positions[0][0]][positions[0][1]] = drop2
    ? {
        ...drop2,
        position: positions[0],
      }
    : null;

  newBoard[positions[1][0]][positions[1][1]] = drop1
    ? {
        ...drop1,
        position: positions[1],
      }
    : null;

  return board;
};

/* 縦or横の1列で揃っているドロップのindexを返す */
const getMatchDropIndexes = (line: Drop[]): number[] => {
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

/* 盤面の揃っているドロップをnullにする */
export const alignCheck = (board: Board): Board => {
  /* nullがないかチェック */
  if (
    board.some((columns) => {
      return columns.some((drop) => drop === null);
    })
  ) {
    alert('board has null');
    return board;
  }

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

  return newBoard as Board;
};

/* ドロップが消えた後, 下に詰める */
export const downDrops = (board: Board): Board => {
  const newBoard = [...board];
  for (let column = 0; column < 6; column++) {
    const rows = board.map((row) => row[column]) as Drop[]; // 縦一列
    const nullCount = rows.filter((drop) => drop === null).length;
    if (nullCount > 0) {
      const newRows: NullableDrop[] = rows
        .filter((drop) => drop !== null)
        .map((drop, index) => {
          return {
            ...drop,
            position: [index + nullCount, column],
          };
        });
      /* 5つになるまでnullを追加 */
      for (let i = 0; i < nullCount; i++) {
        newRows.unshift(null);
      }
      newRows.forEach((drop, index) => {
        newBoard[index][column] = drop;
      });
    }
  }

  return newBoard as Board;
};
