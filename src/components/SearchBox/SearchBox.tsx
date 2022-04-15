import SearchIcon from '@mui/icons-material/Search';
import { useSearchBoxStyles } from './SearchBox.styles';
import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export const SearchBox = ({ placeholder = 'SEARCH' }: { placeholder?: string }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const classes = useSearchBoxStyles();
  return (
    <FormControl variant="outlined" className={classes.searchBoxContainer}>
      <OutlinedInput
        // inputProps={{
        //   className: classes.placeholderField,
        // }}
        className={classes.searchInput}
        id="searchbox"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon aria-label="search icon" />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
