import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import { Logout as LogoutButton } from '../Logout';
import Link from 'next/link';

import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { userPanelLinks } from '@/domain/userPaneLink';
import type { IUser } from '@/types/user';

export const UserPane = ({ user }: { user: IUser }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {matchesMobile ? (
        <Typography
          variant="nav"
          onClick={handleClick}
          onMouseEnter={handleClick}
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          Account
        </Typography>
      ) : (
        <IconButton
          onClick={handleClick}
          onMouseEnter={handleClick}
          size="small"
          aria-controls={isOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
      )}
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
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
            <Typography variant="nav">{user.email ?? 'foo@bar.com'}</Typography>
          </MenuItem>

          <Divider />
          {userPanelLinks.map(({ title, path }: { title: string; path: string }, index: number) => (
            <Link href={path} key={`${title}-${index}`}>
              <a style={{ textDecoration: 'none' }}>
                <MenuItem>
                  <Typography variant="nav">{title}</Typography>
                </MenuItem>
              </a>
            </Link>
          ))}

          <Divider />
          <MenuItem>
            <LogoutButton>Logout</LogoutButton>
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};
