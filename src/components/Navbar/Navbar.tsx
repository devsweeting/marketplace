import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavLink } from './components/NavLink';
import { Login } from './components/Login';
import { useUser } from '@/helpers/hooks/useUser';
import { UserPane } from './components/UserPane';
import { SearchModal } from '../SearchModal';
import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { SearchIcon } from './Navbar.styles';

type NavLink = {
  title: string;
  path: string;
};

type NavBarProps = {
  navLinks: NavLink[];
};

export type NavLinksProps = NavLink[];

export const Navbar = ({ navLinks }: NavBarProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  return (
    <>
      <Stack
        direction={`${matchesMobile ? 'column' : 'row'}`}
        sx={{
          flex: 1,
          margin: '0 1.5rem',
          display: 'flex',
          justifyContent: !matchesMobile ? 'flex-end' : '',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {navLinks.map(({ title, path }: { title: string; path: string }, i: any) => (
          <NavLink key={`${title}${i}`} href={path}>
            {title}
          </NavLink>
        ))}
        {matchesMobile && (
          <Typography
            variant="nav"
            component="span"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Search
          </Typography>
        )}
        <SearchIcon onClick={() => setIsOpen(!isOpen)} />
        {!user ? <Login /> : <UserPane user={user} />}
      </Stack>
      <SearchModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
};
