import React from 'react';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@/components/Button';

interface ClearAllFiltersProps {
  clearSelectedFilters: () => void;
  isFilterButtonVisible: number | boolean;
}

export const ClearAllFilter = ({
  clearSelectedFilters,
  isFilterButtonVisible,
}: ClearAllFiltersProps) => {
  return isFilterButtonVisible ? (
    <Button
      variant="contained"
      size="small"
      endIcon={<CloseIcon />}
      onClick={() => {
        clearSelectedFilters();
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        Clear
      </Typography>
    </Button>
  ) : null;
};
