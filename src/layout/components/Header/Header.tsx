import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Navbar } from '@/components/Navbar';
import { SearchBox } from '@/components/SearchBox';
import { SkinContext } from '@/styles/skin-context';
import { useHeaderStyles } from './Header.styles';
import { Routes } from '@/domain/Routes';
import { Divider, Typography } from '@mui/material';

export type HeaderPosition = 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky' | undefined;

export const Header = ({ headerPosition }: { headerPosition: HeaderPosition }) => {
  const classes = useHeaderStyles();
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const { skin /*, setSkin */ } = useContext(SkinContext);

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
  });

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

            <Box className={classes.searchBoxContainer}>
              <SearchBox
                iconColor={skin.header.searchIconColor}
                borderRadius={false}
                placeholder={'Sport, player, set...'}
                reverseTextColor={false}
              />
            </Box>

            <Navbar navLinks={Routes} />
          </Container>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgb(229, 229, 229)' }} />
      </AppBar>
    </>
  );
};
