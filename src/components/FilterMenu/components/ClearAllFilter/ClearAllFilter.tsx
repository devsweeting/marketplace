import React from 'react';
import { Typography, Box } from '@mui/material';
import { useClearAllFilter } from './ClearAllFilter.styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../../Button';

interface ClearAllFiltersProps {
  handleClick: () => void;
}

export const ClearAllFilter: React.FC<ClearAllFiltersProps> = ({ handleClick }) => {
  const classes = useClearAllFilter();
  return (
    <Box className={classes.container}>
      <Typography variant="h3" component="p">
        Filter
      </Typography>
      <Button variant={'outlined'} endIcon={<CloseIcon />} onClick={handleClick}>
        CLEAR ALL
      </Button>
    </Box>
  );
};
