import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@/components/Button';
import { SortBy } from '@/domain/Category';
import { useSortMenuStyles } from './SortMenu.style';

export const SortMenu = ({ handleSortType }: { handleSortType: (id: string) => void }) => {
  const router = useRouter();
  const { query, isReady } = router;
  const classes = useSortMenuStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortType, setSortType] = useState<string>('');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const setSortValue = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const { id } = e.target as HTMLElement;
    id && handleSortType(id);
    setSortType(id);
  };

  useEffect(() => {
    if (isReady) {
      if (Object.keys(query).length > 0 && Object.keys(query).includes('order'))
        for (const value of Object.values(query)) {
          setSortType(value as string);
        }
    }
  }, [isReady, query, sortType]);

  return (
    <>
      <Box sx={{ marginLeft: 'auto' }}>
        <Button
          aria-controls={open ? `Button for Sort Menu}` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="text"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Typography variant="h3" component="h3" className={classes.MenuTitle}>
            SORT BY
          </Typography>
        </Button>
        <Menu
          elevation={0}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          className={classes.MenuBackground}
        >
          <MenuItem
            id={SortBy.DESC}
            onClick={setSortValue}
            selected={sortType === SortBy.DESC}
            disableRipple
          >
            Newest
          </MenuItem>
          <MenuItem
            id={SortBy.ASC}
            onClick={setSortValue}
            selected={sortType === SortBy.ASC}
            disableRipple
          >
            Oldest
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
