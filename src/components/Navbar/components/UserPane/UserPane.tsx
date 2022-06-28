// import Image from 'next/image';
import { useUserPaneStyles } from './UserPane.styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import { Logout as LogoutButton } from '../Logout';
import Link from 'next/link';
import Logout from '@mui/icons-material/Logout';

import { Divider, ListItemIcon, Typography } from '@mui/material';
import { userPanelLinks } from '@/domain/userPanelLink';

export const UserPane = () => {
  const classes = useUserPaneStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    //TODO
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {/* TODO: switch img to next/image */}
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={isOpen ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.25,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {userPanelLinks.map(({ title, path }: { title: string; path: string }, index: any) => (
          <Link href={path} className={classes.userPanelText} key={`${title}-${index}`}>
            <a style={{ textDecoration: 'none' }}>
              <MenuItem>
                <Typography variant="h4" component="span" className={classes.userPanelText}>
                  {title}
                </Typography>
              </MenuItem>
            </a>
          </Link>
        ))}

        <Divider />
        <LogoutButton className={classes.userPanelText}>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </LogoutButton>
      </Menu>
    </>
  );
};
