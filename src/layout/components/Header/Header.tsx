import { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';
import { Navbar } from '@/components/Navbar';
import { SearchBox } from '@/components/SearchBox';
import { Routes } from '@/domain/Routes';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Container,
  LogoWrapper,
  SearchContainer,
  CloseContainer,
  NavContainer,
} from './Header.styles';
import Image from 'next/image';
import { useRouter } from 'next/router';

export type HeaderPosition = 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky' | undefined;

export const Header = ({ headerPosition }: { headerPosition: HeaderPosition }) => {
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const showSearchBar = useRouter().route !== '/';

  const [openState, setOpenState] = useState(false);

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => () => {
    setOpenState(open);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  return (
    <>
      <AppBar position={headerPosition} elevation={clientWindowHeight > 10 ? 1 : 0}>
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: theme.palette.secondary.main,
            height: '80px',
          }}
        >
          <Container>
            <Link href="/">
              <LogoWrapper>
                <Image src="/images/logoJump.svg" alt="Header Logo" height="32" width="113" />
              </LogoWrapper>
            </Link>
            {matchesDesktop ? (
              <>
                {showSearchBar ? (
                  <SearchContainer>
                    <SearchBox
                      borderRadius={false}
                      placeholder={'Sport, player, set...'}
                      reverseTextColor={false}
                    />
                  </SearchContainer>
                ) : null}
                <Navbar navLinks={Routes} />
              </>
            ) : (
              <>
                <NavContainer>
                  <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                </NavContainer>
                <Drawer
                  anchor="right" //from which side the drawer slides in
                  variant="temporary" //if and how easily the drawer can be closed
                  open={openState} //if open is true, drawer is shown
                  onClose={toggleDrawer(false)} //function that is called when the drawer should close
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100vw',
                      maxWidth: '300px',
                      height: '100vh',
                    }}
                  >
                    <CloseContainer>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Close drawer"
                        onClick={toggleDrawer(false)}
                      >
                        <Close />
                      </IconButton>
                    </CloseContainer>

                    <Navbar navLinks={Routes} />
                  </Box>
                </Drawer>
              </>
            )}
          </Container>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgb(229, 229, 229)' }} />
      </AppBar>
    </>
  );
};
