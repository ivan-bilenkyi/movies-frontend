import React from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Toaster />
    </div>
  );
};

export default Layout;
