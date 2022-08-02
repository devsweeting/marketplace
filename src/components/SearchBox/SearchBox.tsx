import React, { useState, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useSearchboxStyles } from './Searchbox.styles';

interface SearchBoxProps {
  placeholder?: string;
  iconColor?: string;
  borderRadius?: any;
  reverseTextColor?: any;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search',
  iconColor = 'rgba(0, 0, 0, 0.6)',
  borderRadius = false,
  reverseTextColor = false,
  className,
}) => {
  const classes = useSearchboxStyles();
  const [value, setValue] = useState('');
  const { skin } = useContext(SkinContext);

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleKeyPress(event);
  };
  const handleSubmit = () => {
    setValue(value.trim());
  };

  return (
    <form
      action="/explore"
      method="get"
      onSubmit={handleSubmit}
      autoComplete="off"
      id="searchBar"
      role="search"
    >
      <FormControl variant="outlined" className={className ? className : classes.wrapper}>
        <OutlinedInput
          role={'textbox'}
          aria-label={'search'}
          sx={{
            borderRadius: borderRadius && skin.header.searchIconBorderRadius,
            color: reverseTextColor && skin.header.searchTextColor,
          }}
          name="q"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" role={'button'} aria-label="search">
                <SearchIcon aria-label="search icon" sx={{ color: iconColor, opacity: '40%' }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};
