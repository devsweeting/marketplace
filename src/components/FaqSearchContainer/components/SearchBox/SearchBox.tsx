import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import { OutlinedInput } from './Searchbox.styles';

export const SearchBox = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <OutlinedInput
      role={'textbox'}
      aria-label={'search box'}
      name="q"
      value={value}
      onChange={handleChange}
      placeholder={'Search by topic, keyword etc.'}
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <IconButton type="submit" role={'button'}>
            <SearchIcon aria-label="search icon" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
