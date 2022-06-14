import React, { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@/components/Button';
import { BorderBox } from '@/components/BorderBox/BorderBox';
import { SkinContext } from '@/styles/skin-context';
import { useClearAllFilter } from './ClearAllFilter.styles';

interface ClearAllFiltersProps {
  clearSelectedFilters: () => void;
  toggleVisibility: (item: boolean) => void;
  isFilterButtonVisible: number | boolean;
}

export const ClearAllFilter: React.FC<ClearAllFiltersProps> = ({
  clearSelectedFilters,
  toggleVisibility,
  isFilterButtonVisible,
}) => {
  const { skin } = useContext(SkinContext);
  const classes = useClearAllFilter();

  return (
    <BorderBox bottom={4} right={skin.sidebar.borderRight}>
      <Box className={classes.container} sx={{ background: skin.listItem.filterBackgroundColor }}>
        <Box className={classes.closeButton}>
          <ArrowBackIcon className={classes.arrowIcon} onClick={() => toggleVisibility(false)} />
          <Typography variant="h3" component="h3" sx={{ fontSize: '34px' }}>
            Filter
          </Typography>
        </Box>

        {isFilterButtonVisible ? (
          <Button
            variant="outlined"
            size="small"
            sx={{ lineHeight: 1 }}
            endIcon={<CloseIcon />}
            onClick={clearSelectedFilters}
          >
            CLEAR ALL
          </Button>
        ) : null}
      </Box>
    </BorderBox>
  );
};
