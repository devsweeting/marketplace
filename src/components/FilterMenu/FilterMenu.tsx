import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useFilterMenuStyles } from './FilterMenu.styles';
import { SearchBox } from '../../components/SearchBox';
import Typography from '@mui/material/Typography';
import { Accordion } from '../../components/Accordion';
import { FilterGroup } from './components/FilterGroup';
import { BorderBox } from '../BorderBox/BorderBox';

export interface FilterMenuProps {
  categoryTitle: string;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ categoryTitle }) => {
  const classes = useFilterMenuStyles();

  return (
    <Box className={classes.container}>
      {/* <Accordion> */}
      <BorderBox bottom={2} right={2}>
        <Typography variant="h3" component="h3">
          {categoryTitle}
        </Typography>
        <SearchBox placeholder={'SEARCH CATEGORY'} />
        <FilterGroup />
      </BorderBox>
      {/* </Accordion> */}
    </Box>
  );
};
