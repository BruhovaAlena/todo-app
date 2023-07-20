import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type' | 'disabled'
> & {
  title: string;
  onClick?: () => void;
};

const Button = ({ onClick, title, className, type, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx('btn btn-sm', className)}
    >
      {title}
    </button>
  );
};

export default Button;
