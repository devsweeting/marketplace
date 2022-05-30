import React, {  } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import { Button } from '@/components/Button';
import { MenuList } from '@/components/MenuList/';
import { useCategoryPageStyles } from '@/styles/CategoryPage.styles';

export interface SortListProps {
  toggleVisibility: (isVisible: boolean)=> void,
  handleSortType: (id: string) => void;
  sortType: string;
}

const SortList = ({
  toggleVisibility,
  handleSortType,
  sortType
}: SortListProps) => {
  const classes = useCategoryPageStyles();
  return (
    <Box
        className={classes.hideOnDesktop}
        my={2}
        sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
    >
        <Button
            onClick={() => toggleVisibility(true)}
            endIcon={<SettingsIcon />}
            variant="contained"
            size="small"
        >
          Filter
        </Button>
        <MenuList
          sortType={sortType}
          handleSelect={handleSortType}
          buttonType="outlined"
          buttonSize="medium"
        />
    </Box>
  );
};

export default SortList;
