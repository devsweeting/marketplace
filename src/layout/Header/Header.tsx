import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { Navbar } from '../../components/Navbar';
import { SearchBox } from '../../components/SearchBox';
import { useHeaderStyles } from './Header.styles';

export const mockNavLinks = [
  { title: 'Explore', path: '/' },
  { title: 'Sellers', path: '/abc' },
];

export const Header = () => {
  const classes = useHeaderStyles();
  return (
    <>
      <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ backgroundColor: '#fff', height: '148px' }}>
          <Container className={classes.headerContainer}>
            <Image
              src={'/images/logo.png'}
              alt={'logo'}
              width="147px"
              height="43px"
              layout="fixed"
            />
            <SearchBox resourceName={'example'} placeholder={'Search...'} />
            <Navbar navLinks={mockNavLinks} />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
