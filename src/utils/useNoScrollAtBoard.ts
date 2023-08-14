import { useEffect } from 'react';

/**
 * touch event の scroll を無効
 */
export const useNoScrollAtBoard = () => {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const board = document.getElementById('board');
    if (!board) return;
    board.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      board.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
};
