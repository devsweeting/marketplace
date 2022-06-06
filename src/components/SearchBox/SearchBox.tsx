import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
   
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();
    const searchQuery = encodeURIComponent(query);
  }

useEffect(() => {
  
}, [value])

  return (
    <form action='/explore' method="get" autoComplete='off' >
    <FormControl variant="outlined" className={classes.wrapper}>
      <OutlinedInput
        sx={{
          borderRadius: borderRadius && skin.header.searchIconBorderRadius,
          color: reverseTextColor && skin.header.searchTextColor,
        }}
        name="q"
        type="search"
        value={value}
        onChange={handleChange}
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
