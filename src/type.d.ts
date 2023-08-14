type Color = 'red' | 'green' | 'blue' | 'light' | 'dark';
type Position = [number, number]; // [row, column]
type Drop = {
  id: string;
  color: Color;
  position: Position;
  align: boolean;
};
type NullableDrop = Drop | null;
type Board = [
  [
    NullableDrop, // [0, 0]
    NullableDrop, // [0, 1]
    NullableDrop, // [0, 2]
    NullableDrop, // [0, 3]
    NullableDrop, // [0, 4]
    NullableDrop, // [0, 5]
  ],
  [
    NullableDrop, // [1, 0]
    NullableDrop, // [1, 1]
    NullableDrop, // [1, 2]
    NullableDrop, // [1, 3]
    NullableDrop, // [1, 4]
    NullableDrop, // [1, 5]
  ],
  [
    NullableDrop, // [2, 0]
    NullableDrop, // [2, 1]
    NullableDrop, // [2, 2]
    NullableDrop, // [2, 3]
    NullableDrop, // [2, 4]
    NullableDrop, // [2, 5]
  ],
  [
    NullableDrop, // [3, 0]
    NullableDrop, // [3, 1]
    NullableDrop, // [3, 2]
    NullableDrop, // [3, 3]
    NullableDrop, // [3, 4]
    NullableDrop, // [3, 5]
  ],
  [
    NullableDrop, // [4, 0]
    NullableDrop, // [4, 1]
    NullableDrop, // [4, 2]
    NullableDrop, // [4, 3]
    NullableDrop, // [4, 4]
    NullableDrop, // [4, 5]
  ],
];

type Enemy = {
  id: number;
  name: string;
  imageSrc: string;
  life: number;
  attack: number;
};
