import * as React from 'react';

export default ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <main className="min-w-full min-h-screen flex flex-col justify-center bg-gray-700">
    {children}
  </main>
);
