import * as React from 'react';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from './components/NavLink';
import { useNavbarStyles } from './Navbar.styles';
import { Login } from './components/Login';
import { useUser } from '@/helpers/hooks/useUser';
import { UserPane } from './components/UserPane';
import { SearchModal } from '../SearchModal';
import { useState } from 'react';

type NavLink = {
  title: string;
  path: string;
};

export type NavLinksProps = NavLink[];

export const Navbar: React.FC<{ navLinks: NavLinksProps }> = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useNavbarStyles();
  const user = useUser();

  return (
    <Toolbar component="nav" sx={{ display: { xs: `flex` } }}>
      <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {navLinks.map(({ title, path }: { title: string; path: string }, i: any) => (
          <NavLink key={`${title}${i}`} href={path}>
            {title}
          </NavLink>
        ))}
        <Typography variant="h4" component="span" className={classes.searchIcon} ml={2}>
          <SearchIcon
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </Typography>
        {!user ? <Login /> : <UserPane user={user} />}
      </Stack>
      <SearchModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      />
    </Toolbar>
  );
};
