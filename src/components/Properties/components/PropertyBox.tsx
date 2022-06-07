import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { truncateName } from '@/helpers/truncate';
import { usePropertyBoxStyle } from './PropertyBox.styles';

export type TraitType = {
  trait: string;
  value: string;
  display: string | null;
};

export const PropertyBox = ({ attribute }: { attribute: TraitType }) => {
  const { trait, value } = attribute;
  const classes = usePropertyBoxStyle();
  return (
    <Box className={classes.wrapper}>
      <Tooltip title={trait}>
        <Typography variant="h4" component="h3" className={classes.title}>
          {truncateName(trait, 14)}
        </Typography>
      </Tooltip>
      <Tooltip title={value}>
        <Typography variant="h5" component="p" className={classes.propertyValue}>
          {truncateName(value, 8)}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default PropertyBox;
