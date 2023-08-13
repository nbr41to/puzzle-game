import clsx from 'clsx';
import { FC, ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children: ReactNode;
};
export const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button
      className={clsx([
        'bg-teal-500 rounded-md py-3 px-5 shadow text-lg text-white font-bold',
        'hover:translate-y-0.5 hover:shadow-lg',
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
