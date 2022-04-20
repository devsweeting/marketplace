import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDropdownStyle } from './DropDown.styles';
import { SortBy } from '../../domain/Category';

export const DropDownList = ({ handleSelect }: { handleSelect: any }) => {
  // const [sortOption, setSortOption] = React.useState('');

  const classes = useDropdownStyle();

  return (
    <FormControl fullWidth className={classes.container}>
      {/* <InputLabel id="select-label">SORT BY</InputLabel> */}
      <Select
        variant="filled"
        labelId="select-label"
        displayEmpty
        id="select"
        label="dsg"
        onChange={handleSelect}
      >
        <MenuItem value="">SORT BY</MenuItem>
        <MenuItem value={SortBy.LatestDate}>Recently Added</MenuItem>
        <MenuItem value={SortBy.HighestPrice}>Price: High to low</MenuItem>
        <MenuItem value={SortBy.LowestPrice}>Price: Low to high</MenuItem>
      </Select>
    </FormControl>
  );
};
