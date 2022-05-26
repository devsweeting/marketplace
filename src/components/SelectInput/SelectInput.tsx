import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectInput = ({ options, scrollToAnchor }: { options: any; scrollToAnchor: any }) => {
  const [select, setSelect] = React.useState<any>(options[0].id);

  const handleChange = (e) => {
    setSelect(e.target.value);
    scrollToAnchor(e.target.value);
  };

  return (
    <Box>
      <FormControl sx={{ background: 'gray' }}>
        <Select value={select} onChange={handleChange}>
          {options &&
            options.map((o) => (
              <MenuItem key={o.id} value={o.id}>
                {o.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          onChange={scrollToAnchor}
        >
          {options &&
            options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
        </Select>
      </FormControl> */}
    </Box>
  );
};

export default SelectInput;
