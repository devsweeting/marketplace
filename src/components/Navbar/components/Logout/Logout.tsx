import { MenuItem, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '@/helpers/auth/UserContext';
import { useRouter } from 'next/router';

export const Logout = ({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element | string;
}) => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const handleLogoutClick = () => {
    userContext.logout();
    void router.push('/logout');
  };

  return (
    <a
      style={{ textDecoration: 'none', display: 'flex' }}
      onClick={handleLogoutClick}
      className={className}
    >
      <MenuItem sx={{ width: '100%' }}>
        <Typography variant="nav" component="span" className={className}>
          {children}
        </Typography>
      </MenuItem>
    </a>
  );
};
