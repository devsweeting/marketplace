import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { Navbar } from '../../components/Navbar';
import { SearchBox } from '../../components/SearchBox';
import { useHeaderStyles } from './Header.styles';
import { mockNavLinks } from '../../__mocks__/mockApiData';

export const Header = () => {
  const classes = useHeaderStyles();
  return (
    <>
      <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ backgroundColor: '#fff', height: '120px' }}>
          <Container className={classes.headerContainer}>
            <Image
              src={'/images/main-logo.svg'}
              alt={'logo'}
              width="147px"
              height="43px"
              layout="fixed"
            />

            <SearchBox />
            <Navbar navLinks={mockNavLinks} />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
