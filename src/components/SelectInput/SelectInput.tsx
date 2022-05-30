import * as React from 'react';
import { Box, Grid, Typography, SelectChangeEvent } from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import classNames from 'classnames';
import MenuItem from '@mui/material/MenuItem';
import { useSelectInput } from './SelectInput.styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Article } from '@/pages/faq/[topic]';

interface SelectInputProps {
  options: { name: string; id: string }[];
  handleSelectChangeOnMobile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fixedType?: boolean;
  activeTopic: Article;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  handleSelectChangeOnMobile,
  fixedType = false,
  activeTopic,
}) => {
  const classes = useSelectInput();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classNames(fixedType ? classes.fixedWrapper : classes.wrapper)}
    >
      <Box className={classNames(fixedType ? classes.fixedSelectLeftPart : classes.selectLeftPart)}>
        <Typography variant="body1" component="span" className={classes.selectLeftText}>
          Topic
        </Typography>
      </Box>
      <Box
        className={classNames(fixedType ? classes.fixedSelectRightPart : classes.selectRightPart)}
      >
        <FormControl>
          <Select
            value={activeTopic.category}
            onChange={(e: any) => handleSelectChangeOnMobile(e)}
            IconComponent={KeyboardArrowDownIcon}
            inputProps={{
              classes: {
                icon: classNames(fixedType ? classes.fixedSelectIcon : null),
              },
            }}
            MenuProps={{ classes: { paper: classNames(fixedType ? classes.dropdown : null) } }}
          >
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
