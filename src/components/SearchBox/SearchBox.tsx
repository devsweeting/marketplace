import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useSearchBoxStyles } from './SearchBox.styles';

export const SearchBox = () => {
  const classes = useSearchBoxStyles();
  return (
    <div className={classes.searchBoxContainer}>
      <div className={classes.searchIconWrapper}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        className={classes.inputBase}
      />
    </div>
  );
};
