import React, { useContext } from 'react';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@/components/Button';
import { BorderBox } from '@/components/BorderBox/BorderBox';
import { SkinContext } from '@/styles/skin-context';
import { useClearAllFilter } from './ClearAllFilter.styles';

interface ClearAllFiltersProps {
  clearSelectedFilters: () => void;
  isFilterButtonVisible: number | boolean;
}

export const ClearAllFilter: React.FC<ClearAllFiltersProps> = ({
  clearSelectedFilters,
  isFilterButtonVisible,
}) => {
  const { skin } = useContext(SkinContext);
  const classes = useClearAllFilter();

  return (
    <BorderBox right={skin.sidebar.borderRight}>
      <Box className={classes.container}>
        {isFilterButtonVisible ? (
          <Button
            variant="outlined"
            size="small"
            sx={{ lineHeight: 1 }}
            endIcon={<CloseIcon />}
            onClick={() => {
              clearSelectedFilters();
            }}
          >
            CLEAR ALL
          </Button>
        ) : null}
      </Box>
    </BorderBox>
  );
};
