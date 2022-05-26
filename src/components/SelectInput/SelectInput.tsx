import * as React from 'react';
import { Box, Grid, Typography, SelectChangeEvent } from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import { useSelectInput } from './SelectInput.styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SelectInputProps {
  options: { name: string; id: string }[];
  handleSelectChangeMobile: (val: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, handleSelectChangeMobile }) => {
  const classes = useSelectInput();
  const [select, setSelect] = React.useState<string>(options[0].id);

  const handleChange = (e: SelectChangeEvent<string>, child: React.ReactNode) => {
    const { value } = e.target;
    handleSelectChangeMobile(value);
    setSelect(value);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.wrapper}
    >
      <Box className={classes.selectLeftPart}>
        <Typography variant="body1" component="span" className={classes.selectLeftText}>
          Topic
        </Typography>
      </Box>
      <Box className={classes.selectRightPart}>
        <FormControl>
          <Select value={select} onChange={handleChange} IconComponent={KeyboardArrowDownIcon}>
            {options &&
              options.map((o: any) => (
                <MenuItem key={o.id} value={o.id}>
                  {o.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default SelectInput;
