import SearchIcon from '@mui/icons-material/Search';
import { useSearchBoxStyles } from './SearchBox.styles';
import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export const SearchBox = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const classes = useSearchBoxStyles();
  return (
    // <div className={classes.searchBoxContainer}>
    //   <InputBase
    //     placeholder="Search…"
    //     inputProps={{ 'aria-label': 'search' }}
    //     className={classes.inputBase}
    //   />
    //   <div className={classes.searchIconWrapper}>
    //     <SearchIcon />
    //   </div>
    // </div>
    <FormControl variant="outlined" className={classes.searchBoxContainer}>
      <OutlinedInput
        // inputProps={{
        //   className: classes.placeholderField,
        // }}
        id="searchbox"
        value={value}
        onChange={handleChange}
        placeholder="search"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon aria-label="search icon" />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
