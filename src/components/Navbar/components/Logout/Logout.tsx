import { Typography } from '@mui/material';
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
    <a style={{ textDecoration: 'none' }} onClick={handleLogoutClick} className={className}>
      <Typography variant="nav" component="span" className={className}>
        {children}
      </Typography>
    </a>
  );
};
