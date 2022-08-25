import { Box, TextField, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Button } from '@/components/Button';
import React, { useState, useEffect } from 'react';
import { useRangeStyles } from './RangeFilter.styles';
import type { DisabledRanges, DisabledRangesKey, RangeFilters } from '@/types/assetTypes';
import { useRouter } from 'next/router';

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
  handleRange: (id: string, val: any) => void;
  removeFilterRange: (id: string) => void;
  filterRanges: RangeFilters;
  disabledRanges: DisabledRanges;
  handleDisabled: (key: DisabledRangesKey) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useRangeStyles();
  const { query } = useRouter();
  let rangeMin;
  let rangeMax;
  if (Object.keys(query).length > 0) {
    for (const [key, range] of Object.entries(query)) {
      if (key.startsWith(`attr_gte[${filter.categoryId}]`) && range) {
        rangeMin = range;
      }
      if (key.startsWith(`attr_lte[${filter.categoryId}]`) && range) {
        rangeMax = range;
      }
    }
  }

  const [min, setMin] = useState(rangeMin ? rangeMin : filter.range?.[0]);
  const [max, setMax] = useState(rangeMax ? rangeMax : filter.range?.[filter.range?.length - 1]);
  const [value, setValue] = useState([rangeMin ? rangeMin : min, rangeMax ? rangeMax : max]);

  useEffect(() => {
    setValue([min, max]);
  }, [max, min]);

  const handleApplyClick = () => {
    setValue([min, max]);
    handleRange(filter.categoryId, value);
    handleDisabled(filter.categoryId as DisabledRangesKey);
  };

  const handleRemoveClick = () => {
    removeFilterRange(filter.categoryId);
    handleDisabled(filter.categoryId as DisabledRangesKey);
  };
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    switch (name) {
      case 'min':
        setMin(value);
        setValue([min, max]);
        return;
      case 'max':
        setMax(value);
        setValue([min, max]);
        return;
      default:
        setValue([min, max]);
        break;
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValue([min, max]);
    !disabledRanges[filter.categoryId] && handleRange(filter.categoryId, value);
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
              value={min}
              onChange={handleChange}
              label="Min"
              name="min"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: filter.range?.[0],
                  max: filter.range?.[filter.range?.length - 2],
                  step: 1,
                },
              }}
              style={{ margin: 20 }}
            />
            <TextField
              type="number"
              value={max}
              onChange={handleChange}
              name="max"
              label="Max"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: filter.range?.[0],
                  max: filter.range?.[filter.range?.length - 1],
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
