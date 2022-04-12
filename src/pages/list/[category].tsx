// import React, { useState, useEffect } from 'react';
import { categoryViewData } from '../../__mocks__/mockCategoryViewApiData';
import { Grid, Box, Typography } from '@mui/material';
import { BorderBox } from '../../components/BorderBox/BorderBox';
import { Filter } from '../../components/Filter';
import { ListItem } from '../../components/ListItem';
import { DropDownList } from '../../components/DropDownList';
import { FilterMenu } from '../../components/FilterMenu';

const CategoryPage = () => {
  //   const router = useRouter();
  //   const { param } = router.query;

  return (
    <Box sx={{ maxWidth: 1440, margin: '0 auto', marginTop: '0', padding: '0 8px' }}>
      <Grid
        mt={15}
        container
        columnSpacing={4}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid container item md={3} xs={12} rowSpacing={2}>
          <Grid item xs={12}>
            <BorderBox bottom={3} right={3}>
              <Filter />
            </BorderBox>
            <FilterMenu categoryTitle={'categoryTitle'} />
          </Grid>
        </Grid>

        <Grid container item md={9} xs={12} rowSpacing={2}>
          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box mt={6}>
              <Typography variant="h2" component="h2" mb={1}>
                Explore
              </Typography>
              <Typography variant="body1" component="p">
                500 assets
              </Typography>
            </Box>
            <DropDownList />
          </Grid>
          <Grid>
            <ListItem listItemData={categoryViewData} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryPage;
