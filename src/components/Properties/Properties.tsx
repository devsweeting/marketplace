import React from 'react';
import { usePropertiesStyle } from './Properties.styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Grid } from '@mui/material';
import { PropertyBox } from './components';

const traits = [
  { property: 'overall psa', number: '9', stat: '23%' },
  { property: 'ocentering', number: '9', stat: '23%' },
  { property: 'edges', number: '9', stat: '23%' },
  { property: 'corners', number: '9', stat: '23%' },
  { property: 'surface', number: '9', stat: '23%' },
];

export const Properties = () => {
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
        {traits.map((trait) => (
          <PropertyBox trait={trait} key={trait.property} />
        ))}
      </Grid>
    </Box>
  );
};
