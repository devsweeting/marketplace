import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Grid } from '@mui/material';
import { PropertyBox } from './components';
import { TraitType } from './components/PropertyBox';
import { usePropertiesStyle } from './Properties.styles';

type AttributeProps = TraitType[];

export const Properties = ({ attributes }: { attributes: AttributeProps }) => {
  const classes = usePropertiesStyle();

  return (
    <Box className={classes.wrapper}>
      <Box my={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider />
      </Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginBottom: { xs: 2, md: 3 }, color: '#000' }}
      >
        Properties
      </Typography>

      <Grid container>
        {attributes.map((attribute) => (
          <PropertyBox attribute={attribute} key={attribute.trait} />
        ))}
      </Grid>
    </Box>
  );
};
