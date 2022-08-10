import { Box, TextField, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Button } from '@/components/Button';
import React, { useState, useEffect } from 'react';
import { useRangeStyles } from './RangeFilter.styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const RangeFilter = ({
  handleRange,
  removeFilterRange,
  filterRanges,
  disabledRanges,
  handleDisabled,
  filter,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { categoryId, range } = filter;
  const classes = useRangeStyles();

  const [rangeValueOne, setRangeValueOne] = useState<number>(Number(range?.[0]));
  const [rangeValueTwo, setRangeValueTwo] = useState<number>(Number(range?.[range?.length - 1]));
  const [value, setValue] = useState<number[]>([
    Number(range?.[0]),
    Number(range?.[range?.length - 1]),
  ]);

  const handleApplyClick = () => {
    setValue([rangeValueOne, rangeValueTwo]);
    handleRange(categoryId, value);
    handleDisabled(categoryId);
  };

  useEffect(() => {
    if (!filterRanges) {
      setValue([Number(range?.[0]), Number(range?.[range?.length - 1])]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRanges]);

  useEffect(() => {
    !disabledRanges[categoryId] && handleRange(categoryId, value);
    disabledRanges[categoryId] && removeFilterRange(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledRanges[categoryId]]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? `${filter.categoryId}` : undefined;
  return (
    <Box>
      <Button
        className={open ? classes.open : classes.popoverButton}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {filter.categoryId}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {' '}
        {categoryId}
        <TextField
          type="number"
          value={rangeValueOne}
          onChange={(newValue) => setRangeValueOne(parseInt(newValue.target.value))}
          defaultValue="Small"
          label="From"
          variant="outlined"
          size="small"
          InputProps={{
            inputProps: {
              min: Number(range?.[0]),
              max: Number(range?.[range?.length - 2]),
              step: 1,
            },
          }}
          style={{ margin: 20 }}
        />
        <TextField
          type="number"
          value={rangeValueTwo}
          onChange={(newValue) => setRangeValueTwo(parseInt(newValue.target.value))}
          defaultValue="Small"
          label="To"
          variant="outlined"
          size="small"
          InputProps={{
            inputProps: {
              min: Number(range?.[0]),
              max: Number(range?.[range?.length - 1]),
              step: 1,
            },
          }}
          style={{ margin: 20 }}
        />
        <Button onClick={handleApplyClick} style={{ padding: 20 }}>
          <Typography>{disabledRanges[categoryId] ? 'Apply' : 'Remove'}</Typography>
        </Button>
      </Popover>
    </Box>
  );
};
