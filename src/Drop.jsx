import React from 'react';
import { useGesture } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';
export const Drop = ({ drop }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) => {
      api.start({ x: down ? mx : 0, y: down ? my : 0 });
    },
    onDragEnd: (state) => {
      console.log(state.previous);
      const el = document.elementFromPoint(
        state.previous[0],
        state.previous[1]
      );
      console.log(el);
    },
  });
  console.log(x, y);
  return (
    <animated.div
      {...bind()}
      style={{ x, y }}
      className={`drop ${drop.color} ${drop.id}`}
    />
  );
};
