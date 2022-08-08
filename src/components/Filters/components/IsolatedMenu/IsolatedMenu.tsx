import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { FilterGroup } from '../FilterGroup/FilterGroup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Typography } from '@mui/material';
import { RangeInput } from '../RangeInput/RangeInput';
import type { FilterMenuProps } from '@/components/FilterMenu/FilterMenu';
import { useIsolatedMenuStyles } from './IsolatedMenu.styles';

export const IsolatedMenu: React.FC<FilterMenuProps> = ({
  categoriesList,
  handleFiltersChange,
  handleRange,
  removeFilterRange,
  filterRanges,
  handleDisabled,
  checkedFilters,
  disabledRanges,
}) => {
  const classes = useIsolatedMenuStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    sessionStorage.setItem('scrollPosition', window.scrollY as unknown as string);
  };
  const handleClose = () => {
    setAnchorEl(null);
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  };
  return (
    <>
      <Button
        aria-controls={open ? `Button for ${categoriesList.categoryName}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        className={open ? classes.MenuButton : undefined}
      >
        <Typography variant="h3" component="h3" className={classes.MenuTitle}>
          {categoriesList.categoryName}
        </Typography>
      </Button>
      <Menu
        MenuListProps={{
          'aria-labelledby': `Menu for ${categoriesList.categoryName}`,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        className={classes.MenuBackground}
      >
        <Box>
          {categoriesList.filterType === 'checkbox' && (
            <FilterGroup
              category={categoriesList}
              handleFiltersChange={handleFiltersChange}
              checkedFilters={checkedFilters}
            />
          )}
          {categoriesList.filterType === 'slider' && (
            <RangeInput
              category={categoriesList}
              handleFiltersChange={handleFiltersChange}
              handleRange={handleRange}
              removeFilterRange={removeFilterRange}
              filterRanges={filterRanges}
              handleDisabled={handleDisabled}
              disabledRanges={disabledRanges}
            />
          )}
        </Box>
      </Menu>
    </>
  );
};
