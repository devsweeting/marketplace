import { Box, TextField, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Button } from '@/components/Button';
import React, { useState, useEffect, useRef } from 'react';
import { useRangeStyles } from './RangeFilter.styles';
import type { DisabledRanges, DisabledRangesKey, RangeFilters } from '@/types/assetTypes';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const RangeFilter = ({
  handleRange,
  removeFilterRange,
  disabledRanges,
  handleDisabled,
  filter,
}: {
  filter:
    | {
        categoryName: string;
        filterType: string;
        categoryId: string;
        filters: string[];
        range?: undefined;
      }
    | {
        categoryName: string;
        filterType: string;
        categoryId: string;
        range: string[];
        filters?: undefined;
      };
  handleRange: (id: string, val: number[]) => void;
  removeFilterRange: (id: string) => void;
  filterRanges: RangeFilters;
  disabledRanges: DisabledRanges;
  handleDisabled: (key: DisabledRangesKey) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useRangeStyles();

  const [rangeValueOne, setRangeValueOne] = useState<number>(Number(filter.range?.[0]));
  const [rangeValueTwo, setRangeValueTwo] = useState<number>(
    Number(filter.range?.[filter.range?.length - 1]),
  );

  const rangeValueOneRef = useRef<number>(rangeValueOne);
  const rangeValueTwoRef = useRef<number>(rangeValueTwo);
  const _setRangeValueOne = (data: number) => {
    rangeValueOneRef.current = data;
    setRangeValueOne(rangeValueOneRef.current);
  };
  const _setRangeValueTwo = (data: number) => {
    rangeValueTwoRef.current = data;
    setRangeValueTwo(rangeValueTwoRef.current);
  };

  const [value, setValue] = useState<number[]>([rangeValueOne, rangeValueTwo]);
  const valueRef = useRef<number[]>();
  const _setValue = (data: number[]) => {
    valueRef.current = data;
    setValue(valueRef.current);
  };

  const handleApplyClick = () => {
    _setValue([rangeValueOne, rangeValueTwo]);
    handleRange(filter.categoryId, value);
    handleDisabled(filter.categoryId as DisabledRangesKey);
  };

  const handleRemoveClick = () => {
    removeFilterRange(filter.categoryId);
    handleDisabled(filter.categoryId as DisabledRangesKey);
  };

  useEffect(() => {
    if (valueRef.current) {
      !disabledRanges[filter.categoryId] && handleRange(filter.categoryId, valueRef.current);
    }
  }, [disabledRanges, filter.categoryId, handleRange]);

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
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
      >
        <Typography variant="h3" component="h3" className={classes.MenuTitle}>
          {filter.categoryId}
        </Typography>
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
        className={classes.MenuBackground}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="h3" component="h4" sx={{ fontSize: '14px', marginLeft: 2 }}>
            {filter.categoryId}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
              type="number"
              value={rangeValueOneRef.current}
              onChange={(newValue) => _setRangeValueOne(parseInt(newValue.target.value))}
              defaultValue="Small"
              label="From"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: Number(filter.range?.[0]),
                  max: Number(filter.range?.[filter.range?.length - 2]),
                  step: 1,
                },
              }}
              style={{ margin: 20 }}
            />
            <TextField
              type="number"
              value={rangeValueTwoRef.current}
              onChange={(newValue) => _setRangeValueTwo(parseInt(newValue.target.value))}
              defaultValue="Small"
              label="To"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: Number(filter.range?.[0]),
                  max: Number(filter.range?.[filter.range?.length - 1]),
                  step: 1,
                },
              }}
              style={{ margin: 20 }}
            />
            {disabledRanges[filter.categoryId] ? (
              <Button onClick={handleApplyClick} style={{ padding: 20 }} variant="text">
                <Typography>Apply</Typography>
              </Button>
            ) : (
              <Button onClick={handleRemoveClick} style={{ padding: 20 }} variant="text">
                <Typography>Remove</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
