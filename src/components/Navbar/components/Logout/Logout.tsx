import { Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '@/helpers/auth/UserContext';
import { useRouter } from 'next/router';

export const Logout = ({ className }: { className?: string }) => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const handleLogoutClick = () => {
    userContext.logout();
    router.push('/logout');
  };

  return (
    <a style={{ textDecoration: 'none' }} onClick={handleLogoutClick} className={className}>
      <Typography variant="h4" component="span" className={className}>
        LogOut
      </Typography>
    </a>
  );
};
