import React from 'react';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from './components/NavLink';
import { useNavbarStyles } from './Navbar.styles';
import { Login } from '../Login/components';

type NavLink = {
  title: string;
  path: string;
};

export type NavLinksProps = NavLink[];

export const Navbar: React.FC<{ navLinks: NavLinksProps }> = ({ navLinks }) => {
  const classes = useNavbarStyles();
  return (
    <Toolbar component="nav" sx={{ display: { xs: `flex` } }}>
      <Stack direction="row">
        {navLinks.map(({ title, path }: { title: string; path: string }, i: any) => (
          <NavLink key={`${title}${i}`} href={path}>
            {title}
          </NavLink>
        ))}
        <Typography variant="h4" component="span" className={classes.searchIcon} ml={3}>
          <SearchIcon />
        </Typography>
        <Login />
      </Stack>
    </Toolbar>
  );
};
