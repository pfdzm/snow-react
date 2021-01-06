import * as React from 'react';

interface ButtonProps {
  children: string;
}

export default ({ children }: ButtonProps) => (
  <button className="py-1 px-2 rounded text-gray-600 bg-yellow-300">
    {children}
  </button>
);
