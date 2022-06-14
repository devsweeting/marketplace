import React from 'react';
import { Header } from './components/Header';
import type { HeaderPosition } from './components/Header/Header';
import { Footer } from './components/Footer';

export const Layout = ({
  children,
  headerPosition,
}: {
  children: React.ReactNode;
  headerPosition: HeaderPosition;
}) => {
  return (
    <>
      <Header headerPosition={headerPosition} />
      {children}
      <Footer />
    </>
  );
};
