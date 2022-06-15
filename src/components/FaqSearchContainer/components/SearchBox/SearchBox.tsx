import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useSearchboxStyles } from './Searchbox.styles';

export const SearchBox = () => {
  const classes = useSearchboxStyles();
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.wrapper}>
      <OutlinedInput
        role={'textbox'}
        aria-label={'search box'}
        name="q"
        value={value}
        onChange={handleChange}
        placeholder={'Search by topic, keyword etc.'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit" role={'button'}>
              <SearchIcon aria-label="search icon" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
