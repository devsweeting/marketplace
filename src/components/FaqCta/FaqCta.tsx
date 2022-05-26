import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Button } from '../Button';
import { useFaqCtaStyles } from './FaqCta.styles';
import Link from 'next/link';

const FaqCta = () => {
  const classes = useFaqCtaStyles();
  return (
    <Grid container item xs={12} mt={9} mb={{ xs: 9.5, md: 0 }} className={classes.ctaWrapper}>
      <Typography variant="h3" component="p" className={classes.ctaTitle}>
        Couldn’t find answer?
      </Typography>
      <Box sx={{ padding: { md: '0 16px', xs: '16px' } }}>
        <Button variant="outlined" size="small" sx={{ marginRight: '10px' }}>
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
            <a className={classes.ctaLink}>contact us</a>
          </Link>
          .
        </Typography>
      </Box>
    </Grid>
  );
};

export default FaqCta;
