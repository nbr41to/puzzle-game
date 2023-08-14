import { generateDrop } from '@/utils/drop';

export const onBoard = (position: Position): boolean => {
  const [row, column] = position;
  return -1 < row && row < 5 && -1 < column && column < 6;
};
const onStandbyBoard = (position: Position): boolean => {
  const [row, column] = position;
  return -6 < row && row < 0 && -1 < column && column < 6;
};

/**
 * Drop[] to Board
 */
export const dropsToBoard = (drops: readonly Drop[]): Board => {
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
    if (!onBoard(drop.position)) return;
    board[row][column] = drop;
  });

  return board;
};

/**
 * Drop[] to StandbyBoard
 */
export const dropsToStandbyBoard = (drops: readonly Drop[]): Board => {
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
    if (!onStandbyBoard(drop.position)) return;
    board[row + 5][column] = drop;
  });

  return board;
};

/**
 * 待機盤面にDropを供給
 */
export const provideStandbyDrops = (current?: Drop[]): Drop[] => {
  const board = dropsToStandbyBoard(current || []);
  const newDrops = [...(current || [])];

  /* nullにDropを供給 */
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      if (board[row][column] === null) {
        newDrops.push(generateDrop([row - 5, column]));
      }
    }
  }

  return newDrops;
};

/**
 * 盤面と待機盤面上にないドロップを削除
 */
export const cleanDrops = (drops: readonly Drop[]): Drop[] => {
  const newDrops = drops.filter((drop) => {
    const [row, column] = drop.position;
    return -5 < row || (row < 5 && -1 < column) || column < 6;
  });

  return newDrops;
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

/**
 * 揃っているDropのalignをtrueにする
 */
export const alignCheck = (
  drops: readonly Drop[],
): {
  newDrops: Drop[];
  amount: number;
} => {
  const checkTargetDrops = drops.filter((drop) => drop.position[0] > -1);
  const alignPositions = new Set<Position>();

  /* 列のチェック */
  for (let row = 0; row < 5; row++) {
    const columns = (checkTargetDrops as Drop[])
      .filter((drop) => drop.position[0] === row)
      .sort((a, b) => a.position[1] - b.position[1]);
    getMatchDropIndexes(columns).forEach((column) => {
      alignPositions.add([row, column]);
    });
  }
  /* 行のチェック */
  for (let column = 0; column < 6; column++) {
    const rows = (checkTargetDrops as Drop[])
      .filter((drop) => drop.position[1] === column)
      .sort((a, b) => a.position[0] - b.position[0]);
    getMatchDropIndexes(rows).forEach((row) => {
      alignPositions.add([row, column]);
    });
  }

  const alignPositionsArray = Array.from(alignPositions);
  const newDrops = (drops as Drop[]).map((drop) => {
    const isAlign = alignPositionsArray.some(
      (position) =>
        position[0] === drop.position[0] && position[1] === drop.position[1],
    );
    return isAlign ? { ...drop, align: true } : drop;
  });

  return {
    newDrops,
    amount: alignPositionsArray.length,
  };
};

/**
 * Dropのalignがtrueのものを削除
 */
export const removeAlignDrops = (drops: readonly Drop[]): Drop[] => {
  const newDrops = drops.filter((drop) => drop.align === false);

  return newDrops;
};

/**
 * Dropが消えた後, 下に詰める
 */
export const packDownDrops = (drops: readonly Drop[]): Drop[] => {
  const board = dropsToBoard(drops);
  const tmpDownedDrops: Drop[] = [];
  const wantToDropCounts = [0, 0, 0, 0, 0, 0];

  for (let column = 0; column < 6; column++) {
    const rows = board.map((row) => row[column]); // 縦一列
    const nullCount = rows.filter((drop) => drop === null).length;

    (rows.filter((drop) => drop) as Drop[])
      .sort((a, b) => b.position[0] - a.position[0])
      .forEach((drop, index) => {
        if (drop === null) return;
        tmpDownedDrops.push({
          ...drop,
          position: [4 - index, column],
        });
      });
    wantToDropCounts[column] = nullCount;
  }

  /* 下に詰める */
  const downedDrops = drops.map(
    (drop) => tmpDownedDrops.find((tmpDrop) => tmpDrop.id === drop.id) || drop,
  );

  /* 待機盤面から下に落とす */
  const providedDrops = downedDrops.map((drop) => {
    if (!onStandbyBoard(drop.position)) return drop;
    const [row, column] = drop.position;
    const wantToDropCount = wantToDropCounts[column];

    return {
      ...drop,
      position: [row + wantToDropCount, column],
    } as Drop;
  });

  /* 待機盤面の補充 */
  const providedStandbyDrops = provideStandbyDrops(providedDrops);

  return providedStandbyDrops;
};

/**
 * すべてのドロップを下に5つ移動
 * （盤面を初期化）
 */
export const refreshAllDrop = (drops: readonly Drop[]): Drop[] => {
  const downedDrops = [
    ...drops.map(
      (drop) =>
        ({
          ...drop,
          position: [drop!.position[0] + 5, drop!.position[1]],
        } as Drop),
    ),
  ];

  const providedDrops = provideStandbyDrops(downedDrops);

  return providedDrops;
};
