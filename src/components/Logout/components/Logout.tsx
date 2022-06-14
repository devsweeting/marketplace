import { useNavLinkStyles } from '@/components/Navbar/components/NavLink/NavLink.styles';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import { useContext } from 'react';
import { UserContext } from '@/helpers/UserContext';
import { useRouter } from 'next/router';

export const Logout = () => {
  const classes = useNavLinkStyles();
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleLogoutClick = () => {
    userContext.logout();
    router.push('/logout');
  };

  return (
    <a style={{ textDecoration: 'none' }} onClick={handleLogoutClick}>
      <Typography variant="h4" component="span" className={classNames(classes.navLink)}>
        LogOut
      </Typography>
    </a>
  );
};
