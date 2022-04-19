import React, { useContext } from 'react';
import { SkinContext } from '../../../../../styles/skin-context';
import { Typography, Box } from '@mui/material';
import { useClearAllFilter } from './ClearAllFilter.styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../../Button';

interface ClearAllFiltersProps {
  handleClick: () => void;
  isFilterButtonVisible: boolean;
}

export const ClearAllFilter: React.FC<ClearAllFiltersProps> = ({
  handleClick,
  isFilterButtonVisible,
}) => {
  const { skin } = useContext(SkinContext);
  const classes = useClearAllFilter();
  return (
    <Box className={classes.container} sx={{ background: skin.listItem.filterBackgroundColor }}>
      <Typography variant="h3" component="h3">
        Filter
      </Typography>

      {isFilterButtonVisible ? (
        <Button variant={'outlined'} endIcon={<CloseIcon />} onClick={handleClick}>
          CLEAR ALL
        </Button>
      ) : null}
    </Box>
  );
};
