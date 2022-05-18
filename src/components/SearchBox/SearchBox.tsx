import React, { useState, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
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
  };

  return (
    <FormControl variant="outlined" className={classes.wrapper}>
      <OutlinedInput
        sx={{
          borderRadius: borderRadius && skin.header.searchInconBorderRadius,
          color: reverseTextColor && skin.header.searchTextColor,
        }}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon aria-label="search icon" sx={{ color: iconColor, opacity: '40%' }} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
