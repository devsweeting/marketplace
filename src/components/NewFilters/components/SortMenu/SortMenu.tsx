import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SortBy } from '@/domain/Category';
import { SortButton } from './SortMenu.style';

export const SortMenu = ({ handleSortType }: { handleSortType: (id: string) => void }) => {
  const router = useRouter();
  const { query, isReady } = router;
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
      <SortButton
        aria-controls={open ? `Button for Sort Menu}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
      >
        <Typography variant="body1" fontWeight={500}>
          Sort By
        </Typography>
      </SortButton>
      <Menu
        elevation={0}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
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
    </>
  );
};
