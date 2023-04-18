import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useRef, useState } from 'react';
import { Logout as LogoutButton } from '../Logout';
import Link from 'next/link';

import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { userPanelLinks } from '@/domain/userPaneLink';
import type { IUser } from '@/types';
import { ProfileAvatar } from '@/components/Avatar/Avatar';

export const UserPane = ({ user }: { user: IUser }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const anchor = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {matchesMobile ? (
        <Typography
          ref={anchor}
          variant="nav"
          onClick={handleOpen}
          onMouseEnter={handleOpen}
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          Account
        </Typography>
      ) : (
        <IconButton
          ref={anchor}
          onClick={handleOpen}
          onMouseEnter={handleOpen}
          size="small"
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          <ProfileAvatar />
        </IconButton>
      )}
      <Menu
        open={isOpen}
        anchorEl={anchor.current}
        onClose={handleClose}
        style={{ marginTop: matchesMobile ? 6 : 1 }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div onMouseLeave={handleClose}>
          <MenuItem sx={{ pointerEvents: 'none' }}>
            <Typography variant="nav">{user.email ?? 'Not signed in'}</Typography>
          </MenuItem>

          <Divider />
          {userPanelLinks.map(({ title, path }: { title: string; path: string }, index: number) => (
            <Link
              href={path}
              key={`${title}-${index}`}
              style={{ textDecoration: 'none', display: 'flex' }}
            >
              <MenuItem sx={{ width: '100%' }}>
                <Typography variant="nav">{title}</Typography>
              </MenuItem>
            </Link>
          ))}

          <Divider />
          <LogoutButton>Logout</LogoutButton>
        </div>
      </Menu>
    </>
  );
};
