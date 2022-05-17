import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Navbar } from '@/components/Navbar';
import { SearchBox } from '@/components/SearchBox';
import { mockNavLinks } from '@/__mocks__/mockApiData';
import { SkinContext } from '@/styles/skin-context';
import { useHeaderStyles } from './Header.styles';
// import { skins } from '../../../styles/skin-context';

export const Header = () => {
  const classes = useHeaderStyles();
  const { skin /*, setSkin */ } = useContext(SkinContext);

  // disabled theme toggling
  // const handleClick = () => {
  //   if (skin === skins.pwcc) {
  //     setSkin(skins.jump);
  //   } else {
  //     setSkin(skins.pwcc);
  //   }
  // };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: skin.header.headerBackground,
            height: '120px',
          }}
        >
          <Container
            className={classes.container}
            sx={{ color: '#000', borderImageSource: `url(${skin.borderBoxBackground})` }}
          >
            <Link href="/">
              <a>
                {' '}
                <Image
                  src={skin.logo.image}
                  alt={'logo'}
                  width={skin.logo.width}
                  height={skin.logo.height}
                  layout="fixed"
                  // onClick={handleClick}
                />
              </a>
            </Link>

            <Box className={classes.searchBoxContainer} ml={3}>
              <SearchBox
                iconColor={skin.header.searchIconColor}
                borderRadius={true}
                reverseTextColor={true}
              />
            </Box>

            <Navbar navLinks={mockNavLinks} />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
