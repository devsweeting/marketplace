import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { Navbar } from '../../components/Navbar';

export const mockNavLinks = [
  { title: 'explore', path: '/' },
  { title: 'sellers', path: '/abc' },
];

export const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#ededed', height: '148px' }}>
          <Container maxWidth="lg" sx={{ display: `flex`, justifyContent: `space-between` }}>
            <Image
              src={'/images/logo.png'}
              alt={'logo'}
              width="147px"
              height="43px"
              layout="fixed"
            />
            <Navbar navLinks={mockNavLinks} />
            header
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
