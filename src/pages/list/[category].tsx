import React, { useState, useEffect } from 'react';
import { categoryViewData } from '../../__mocks__/mockCategoryViewApiData';
import { Grid, Box } from '@mui/material';

const CategoryPage = ({ categoryViewData }: { categoryViewData: any }) => {
  //   const router = useRouter();
  //   const { param } = router.query;

  return (
    <Box sx={{ maxWidth: 1440, margin: '0 auto', marginTop: '0', padding: '0 8px' }}>
      <Grid
        mt={16}
        container
        columnSpacing={4}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid container item md={6} xs={12} rowSpacing={2}>
          <Grid item xs={12}>
            <p>lewa kolumna</p>
          </Grid>
        </Grid>

        <Grid container item md={6} xs={12} rowSpacing={2}>
          <Grid item xs={12}>
            <h2>prawa kolumna</h2>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
