import React, { useState, useContext, useEffect } from 'react';
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
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search',
  iconColor = 'rgba(0, 0, 0, 0.6)',
  borderRadius = false,
  reverseTextColor = false,
}) => {
  const classes = useSearchboxStyles();
  const [value, setValue] = useState('');
  const { skin } = useContext(SkinContext);

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit();
     }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
   handleKeyPress(event);
  };
  const handleSubmit = () => {
   setValue(value.trim());
  }

useEffect(() => {
  
}, [value])

  return (
    <form action='/explore' method="get" onSubmit={handleSubmit} autoComplete="off" >
    <FormControl variant="outlined" className={classes.wrapper}>
      <OutlinedInput
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
           <IconButton type='submit'>
           <SearchIcon aria-label="search icon" sx={{ color: iconColor, opacity: '40%' }} />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    </form>
  );
};