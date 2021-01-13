import * as React from 'react';

const Button: React.FC<{
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, className, ...rest }) => (
  <button
    className={
      className
        ? className
        : 'self-end py-4 px-8 text-lg rounded-full bg-yellow-300 hover:bg-yellow-400 transform'
    }
    {...rest}
  >
    <strong>{children}</strong>
  </button>
);

export default Button;
