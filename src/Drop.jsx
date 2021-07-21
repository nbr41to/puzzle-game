import React from 'react';
import { useGesture } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';

export const Drop = ({ drop, changeDrop }) => {
  // const [{ x, y, zIndex }, api] = useSpring(() => ({
  //   x: 0,
  //   y: 0,
  //   zIndex: 0,
  // }));
  // const bind = useGesture({
  //   onDragStart: () => {
  //     api.start({ zIndex: -99 });
  //   },
  //   onDrag: ({ down, movement: [mx, my], previous }) => {
  //     api.start({
  //       x: down ? mx : 0,
  //       y: down ? my : 0,
  //     });
  //     const el = document.elementFromPoint(previous[0], previous[1]);
  //     console.log(el.id);
  //     changeDrop(drop.id, el.id);
  //   },
  //   onDragEnd: () => {
  //     api.start({ zIndex: 0 });
  //     console.log('end');
  //   },
  // });

  const onDrag = (e) => {
    e.preventDefault();
    console.log(e);
    e.dataTransfer.setData('text/plain', null);
    e.dataTransfer.setData('text/plain', null);
    const el = document.elementFromPoint(e.pageX, e.pageY);
    console.log(el.id);
    changeDrop(drop.id, el.id);
  };

  return (
    <img
      id={drop.id}
      src={`sircle_d_${drop.color}.png`}
      alt={`${drop.color}_drop`}
      className={`drop`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', null)}
      onDrag={(e) => onDrag(e)}
    />
  );
};
