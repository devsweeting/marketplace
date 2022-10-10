import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Grid } from '@mui/material';
import { PropertyBox } from './components';
import { usePropertiesStyle } from './Properties.styles';
import type { IAttribute } from '@/types/assetTypes';

type AttributeProps = IAttribute[];

export const Properties = ({ attributes }: { attributes: AttributeProps }) => {
  const classes = usePropertiesStyle();

  return (
    <Box className={classes.wrapper}>
      <Box my={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider />
      </Box>
      <Typography variant="nav" component="h2" className={classes.title}>
        Properties
      </Typography>

      <Grid container>
        {attributes.map((attribute, index) => (
          <PropertyBox attribute={attribute} key={attribute.trait + index} />
        ))}
      </Grid>
    </Box>
  );
};
