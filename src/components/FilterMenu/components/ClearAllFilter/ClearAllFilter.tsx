import React, { useContext } from 'react';
import { SkinContext } from '../../../../../styles/skin-context';
import { Typography, Box } from '@mui/material';
import { useClearAllFilter } from './ClearAllFilter.styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../../../Button';
import { BorderBox } from '../../../BorderBox/BorderBox';

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
    <BorderBox bottom={4} right={skin.sidebar.borderRight}>
      <Box className={classes.container} sx={{ background: skin.listItem.filterBackgroundColor }}>
        <Typography variant="h3" component="h3" sx={{ fontSize: '34px' }}>
          Filter
        </Typography>

        {isFilterButtonVisible ? (
          <Button variant="outlined" endIcon={<CloseIcon />} onClick={handleClick}>
            CLEAR ALL
          </Button>
        ) : null}
      </Box>
    </BorderBox>
  );
};
