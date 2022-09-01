import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { Navbar } from '@/components/Navbar';
import { SearchBox } from '@/components/SearchBox';
import { SkinContext } from '@/styles/skin-context';
import { useHeaderStyles } from './Header.styles';
import { Routes } from '@/domain/Routes';
import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';

export type HeaderPosition = 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky' | undefined;

export const Header = ({ headerPosition }: { headerPosition: HeaderPosition }) => {
  const classes = useHeaderStyles();
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const { skin /*, setSkin */ } = useContext(SkinContext);
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const [openState, setOpenState] = useState(false);

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => () => {
    setOpenState(open);
  };

  // disabled theme toggling
  // const handleClick = () => {
  //   if (skin === skins.pwcc) {
  //     setSkin(skins.jump);
  //   } else {
  //     setSkin(skins.pwcc);
  //   }
  // };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  return (
    <>
      <AppBar position={headerPosition} elevation={clientWindowHeight > 10 ? 6 : 0}>
        <Toolbar
          disableGutters={false}
          sx={{
            backgroundColor: skin.header.headerBackground,
            height: '80px',
          }}
        >
          <Container className={classes.container}>
            <Link href="/">
              <a className={classes.anchorWrapper}>
                <Box className={classes.logoWrapper}>
                  <Image src={skin.logo.image} alt={'logo'} layout="fill" objectFit="contain" />
                </Box>
                <Typography className={classes.nftTextWrapper}>NFT</Typography>
              </a>
            </Link>
            <Divider orientation="vertical" className={classes.vertivalDivider} />
            {matchesDesktop ? (
              <>
                <Box className={classes.searchBoxContainer}>
                  <SearchBox
                    iconColor={skin.header.searchIconColor}
                    borderRadius={false}
                    placeholder={'Sport, player, set...'}
                    reverseTextColor={false}
                  />
                </Box>

                <Navbar navLinks={Routes} />
              </>
            ) : (
              <>
                <IconButton
                  edge={'end'}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                  style={{ marginRight: '10px' }}
                >
                  <MenuIcon />
                </IconButton>
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
                      justifyContent: 'space-evenly',

                      width: '50vw',
                      height: '100vh',
                    }}
                  >
                    <IconButton
                      edge={'end'}
                      color="inherit"
                      aria-label="Close drawer"
                      onClick={toggleDrawer(false)}
                      sx={{ mr: 1 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: '30%',
                        marginLeft: '10%',
                      }}
                    >
                      <CloseIcon style={{ justifyContent: 'center', alignItems: 'center' }} />
                    </IconButton>

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
