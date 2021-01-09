import * as React from 'react';
import Logo from './Logo';

const Card: React.FC = ({ children }) => (
  <div className="mx-auto relative">
    <Logo />
    <div className="shadow-md justify-center max-w-3xl bg-white text-gray-800 px-10 py-16 rounded relative z-10">
      <main className="flex flex-col align-center prose">{children}</main>
    </div>
  </div>
);

export default Card;
