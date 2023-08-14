import { dropsToBoard, dropsToStandbyBoard } from '@/utils/board';

export const seeBoard = (drops: Drop[]) => {
  console.log(dropsToBoard(drops));
};
export const SEE_BOARD_BY_COLOR = (drops: Drop[]) => {
  console.log(
    dropsToBoard(drops).map((row) => row.map((drop) => drop?.color || null)),
  );
};
export const SEE_BOARD_BY_POSITION = (drops: Drop[]) => {
  console.log(
    dropsToBoard(drops).map((row) =>
      row.map((drop) => String(drop?.position) || null),
    ),
  );
};
export const SEE_STANDBY_BOARD_BY_COLOR = (drops: Drop[]) => {
  console.log(
    dropsToStandbyBoard(drops).map((row) =>
      row.map((drop) => drop?.color || null),
    ),
  );
};

export const seeDropsPositions = (drops: Drop[]) => {
  console.log(drops.map((drop) => drop.position));
};
