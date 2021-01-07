import * as React from 'react';
import Logo from './Logo';

interface CardProps {
  children: JSX.Element | JSX.Element[];
}
export default ({ children }: CardProps) => (
  <div className="mx-auto relative">
    <Logo />
    <div className="flex flex-col align-center shadow-md justify-center w-96 h-48 bg-white text-gray-800 px-5 py-8 rounded relative z-10">
      {children}
    </div>
  </div>
);
