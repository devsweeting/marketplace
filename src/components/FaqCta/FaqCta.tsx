import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Button } from '../Button';
import { useFaqCtaStyles } from './FaqCta.styles';
import Link from 'next/link';

const FaqCta = () => {
  const classes = useFaqCtaStyles();
  return (
    <Grid container item xs={12} mt={9} mb={9.5} className={classes.ctaWrapper}>
      <Typography variant="h3" component="p">
        Couldn’t find answer?
      </Typography>
      <Box sx={{ padding: '0 16px' }}>
        <Button variant="outlined" size="small" sx={{ marginRight: { md: '10px', sx: 0 } }}>
          YES
        </Button>
        <Button variant="outlined" size="small">
          NO
        </Button>
      </Box>
      <Box>
        <Typography variant="body1" component="p" className={classes.ctaDescription}>
          2 out of 15 found this helpful.
        </Typography>
        <Typography variant="body1" component="p" className={classes.ctaDescription}>
          Please{' '}
          <Link href="#">
            <a>contact us</a>
          </Link>
          .
        </Typography>
      </Box>
    </Grid>
  );
};

export default FaqCta;
