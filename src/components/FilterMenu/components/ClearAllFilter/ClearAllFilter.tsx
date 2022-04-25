import React, { useContext } from 'react';
import { SkinContext } from '../../../../../styles/skin-context';
import { Typography, Box } from '@mui/material';
import { useClearAllFilter } from './ClearAllFilter.styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../../Button';
import { BorderBox } from '../../../BorderBox/BorderBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ClearAllFiltersProps {
  clearSelectedFilters: () => void;
  toggleVisibility: (item: boolean) => void;
  isFilterButtonVisible: boolean;
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
