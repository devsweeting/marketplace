import React from 'react';
import { Header } from './components/Header';
import type { HeaderPosition } from './components/Header/Header';
import { Footer } from './components/Footer';
import { styled } from '@mui/material';
import { Modals } from '@/components/Modals';

const MainContainer = styled('div')({
  minHeight: '100vh',
  width: '100vw',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const Layout = ({
  children,
  headerPosition,
}: {
  children: React.ReactNode;
  headerPosition: HeaderPosition;
}) => {
  return (
    <MainContainer>
      <Modals />
      <Header headerPosition={headerPosition} />
      {children}
      <Footer />
    </MainContainer>
  );
};
