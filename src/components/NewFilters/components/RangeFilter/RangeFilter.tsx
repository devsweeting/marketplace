import { TextField, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Button } from '@/components/Button';
import React, { useState, useEffect } from 'react';
import type { DisabledRanges, DisabledRangesKey, RangeFilters } from '@/types';
import { useRouter } from 'next/router';
import { FilterButton, FilterContainer } from './RangeFilter.styles';

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
    <>
      <FilterButton
        aria-describedby={id}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
      >
        <Typography variant="body1" fontWeight={500}>
          {filter.categoryId}
        </Typography>
      </FilterButton>
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
        <FilterContainer>
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
          />
          {disabledRanges[filter.categoryId] ? (
            <Button onClick={handleApplyClick} variant="contained" fullWidth>
              Apply
            </Button>
          ) : (
            <Button onClick={handleRemoveClick} variant="contained" fullWidth>
              Remove
            </Button>
          )}
        </FilterContainer>
      </Popover>
    </>
  );
};
