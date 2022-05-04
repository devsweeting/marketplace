import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from '../../components/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SortBy } from '../../domain/Category';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(() => ({
  '& .MuiPaper-root': {
    width: 280,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
}));

export interface MenuListProps {
  handleSelect: (id: string) => void;
  buttonType: 'text' | 'outlined' | 'contained' | undefined;
  buttonSize: 'small' | 'medium' | 'large' | undefined;
}

export const MenuList: React.FC<MenuListProps> = ({ handleSelect, buttonType, buttonSize }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const setSortValue = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const { id } = e.target as HTMLElement;
    id && handleSelect(id);
  };

  return (
    <Box>
      <Button
        variant={buttonType}
        size={buttonSize}
        disableElevation
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        SORT BY
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={setSortValue}>
        <MenuItem id={SortBy.LatestDate} onClick={setSortValue} disableRipple>
          Recently Added
        </MenuItem>
        <MenuItem id={SortBy.HighestPrice} onClick={setSortValue} disableRipple>
          Price: High to low
        </MenuItem>
        <MenuItem id={SortBy.LowestPrice} onClick={setSortValue} disableRipple>
          Price: Low to High
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};
