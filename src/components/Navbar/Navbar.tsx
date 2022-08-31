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
import { useMediaQuery, useTheme } from '@mui/material';

type NavLink = {
  title: string;
  path: string;
};

export type NavLinksProps = NavLink[];

export const Navbar: React.FC<{ navLinks: NavLinksProps }> = ({ navLinks }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);
  const classes = useNavbarStyles();
  const user = useUser();

  return (
    <Toolbar component="nav" sx={{ display: { xs: `flex` }, justifyContent: 'flex-end' }}>
      <Stack
        direction={`${matchesMobile ? 'column-reverse' : 'row'}`}
        sx={{
          display: 'flex',
          alignItems: matchesMobile ? 'flex-start' : 'center',
          textAlign: 'center',
        }}
      >
        {navLinks.map(({ title, path }: { title: string; path: string }, i: any) => (
          <NavLink key={`${title}${i}`} href={path}>
            {title}
          </NavLink>
        ))}
        <Typography
          variant="h4"
          component="span"
          className={classes.searchIcon}
          ml={matchesMobile ? 1 : 2}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Search
          <SearchIcon />
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
