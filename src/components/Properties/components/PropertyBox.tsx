import React from 'react';
import { usePropertyBoxStyle } from './PropertyBox.styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

export type TraitType = {
  property: string;
  number: string;
  stat: string;
};

export const PropertyBox = ({ trait }: { trait: TraitType }) => {
  const classes = usePropertyBoxStyle();
  return (
    <Box className={classes.wrapper}>
      <Typography variant="h4" component="h3" className={classes.title}>
        {trait.property}
      </Typography>
      <Typography variant="h5" component="p" className={classes.propertyValue}>
        {trait.number}
      </Typography>
      <Divider />
      <Typography variant="body2" component="p" className={classes.propertyDescription}>
        {trait.stat} have this trait
      </Typography>
    </Box>
  );
};

export default PropertyBox;
