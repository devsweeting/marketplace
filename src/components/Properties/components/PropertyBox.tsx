import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { truncateName } from '@/helpers/truncate';
import { usePropertyBoxStyle } from './PropertyBox.styles';
import type { IAttribute } from '@/types/assetTypes';

export const PropertyBox = ({ attribute }: { attribute: IAttribute }) => {
  const { trait, value } = attribute;
  const classes = usePropertyBoxStyle();
  return (
    <Box className={classes.wrapper}>
      <Tooltip title={trait}>
        <Typography variant="nav" component="h3" className={classes.title}>
          {truncateName(trait, 14)}
        </Typography>
      </Tooltip>
      <Tooltip title={value ?? ''}>
        <Typography variant="xl2" component="p" className={classes.propertyValue}>
          {truncateName(value ?? '', 8)}
        </Typography>
      </Tooltip>
    </Box>
  );
};
