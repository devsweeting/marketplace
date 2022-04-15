import React from 'react';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from './components/NavLink';
import { useNavbarStyles } from './Navbar.styles';

type NavLink = {
  title: string;
  path: string;
};

export type NavLinksProps = NavLink[];

export const Navbar: React.FC<{ navLinks: NavLinksProps }> = ({ navLinks }) => {
  const classes = useNavbarStyles();
  return (
    <Toolbar
      // className={classes.toolbarWrapper}
      component="nav"
      sx={{ display: { xs: `none`, md: `flex` } }}
    >
      <Stack direction="row" spacing={4}>
        {navLinks.map(({ title, path }: { title: string; path: string }, i: any) => (
          <NavLink key={`${title}${i}`} href={path}>
            {title}
          </NavLink>
        ))}
      </Stack>
    </Toolbar>
  );
};
