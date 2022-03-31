import React from 'react';
import { useSearchBoxStyles } from './SearchBox.styles';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = ({
  resourceName,
  placeholder,
}: {
  resourceName: string;
  placeholder: string;
}) => {
  const classes = useSearchBoxStyles();

  const action = () => console.log(resourceName);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        className: classes.searchBox,
      }}
      onChange={action}
      placeholder={placeholder}
      variant="outlined"
      aria-labelledby="Search input"
    />
  );
};
