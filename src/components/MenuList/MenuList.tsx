import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from '../../components/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SortBy } from '../../domain/Category';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SkinContext } from '../../../styles/skin-context';

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

export const MenuList = ({ handleSelect }: { handleSelect: any }) => {
  const { skin } = useContext(SkinContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const setSortValue = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    handleSelect(e);
  };

  return (
    <Box mt={3}>
      <Button
        sx={{
          fontWeight: skin.sortButton.fontWeight,
          fontSize: skin.sortButton.fontSize,
          lineHeight: skin.sortButton.lineHeight,
          borderRadius: skin.sortButton.borderRadius,
          width: skin.sortButton.width,
          height: skin.sortButton.height,
          justifyContent: skin.sortButton.justifyContent,
          padding: skin.sortButton.padding,
        }}
        variant="contained"
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
