import React, { useState, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import SearchIcon from '@mui/icons-material/Search';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, Input } from '@mui/material';
import { Wrapper } from './Searchbox.styles';

interface SearchBoxProps {
  placeholder?: string;
  iconColor?: string;
  borderRadius?: boolean;
  reverseTextColor?: boolean;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search',
  iconColor = 'rgba(255, 255, 255, 0.9)',
  borderRadius = true,
  reverseTextColor = false,
  className,
}) => {
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
      action="/search"
      method="get"
      onSubmit={handleSubmit}
      autoComplete="off"
      id="searchBar"
      role="search"
    >
      <Wrapper className={className}>
        <Input
          role={'textbox'}
          aria-label={'search'}
          disableUnderline={true}
          sx={{
            borderRadius: borderRadius ? skin.header.searchIconBorderRadius : null,
            color: reverseTextColor ? skin.header.searchTextColor : null,
            border: '0',
          }}
          name="q"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" role={'button'} aria-label="search">
                <SearchIcon aria-label="search icon" sx={{ color: iconColor }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </Wrapper>
    </form>
  );
};
