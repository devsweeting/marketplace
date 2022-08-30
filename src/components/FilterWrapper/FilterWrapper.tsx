import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFilters } from '@/helpers/hooks/useFilters';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import type { DisabledRanges, DisabledRangesKey, IFilter } from '@/types/assetTypes';
import { NewFilters } from '@/components/NewFilters/NewFilters';
import { ClearAllFilter } from '@/components/NewFilters/components/ClearAllFilter';
import { SortMenu } from '@/components/NewFilters/components/SortMenu';

export const FilterWrapper = () => {
  const router = useRouter();
  const { isReady, query } = router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ready, setReady] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeBrandCard, setActiveBrandCard] = useState<string>('');

  const [disabledRanges, setDisabledRanges] = useState<DisabledRanges>({
    Grade: !Object.keys(query).some((key) => key.includes('Grade')) ? true : false,
    Year: !Object.keys(query).some((key) => key.includes('Year')) ? true : false,
  });

  const {
    checkedFilters,
    rangeFilters,
    updateCheckedFilters,
    updateRangeFilters,
    updateSortByOrder,
    clearQueryFilters,
    clearRangeFilters,
  } = useFilters();

  const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const { name: filterId } = event.target;

    if (
      checkedFilters.find(
        (filter: IFilter) => filter.categoryId === categoryId && filter.filterId === filterId,
      )
    ) {
      const newcheckedFilters = checkedFilters.filter(
        (filter: IFilter) => !(filter.categoryId === categoryId && filter.filterId === filterId),
      );
      updateCheckedFilters(newcheckedFilters).catch(() => {
        return;
      });

      return;
    }
    updateCheckedFilters([...checkedFilters, { filterId, categoryId }]).catch(() => {
      return;
    });
  };

  const handleSortType = (sortBy: string) => {
    updateSortByOrder(sortBy).catch(() => {
      return;
    });
  };

  const clearAllSelectedFilters = () => {
    clearQueryFilters();
    setDisabledRanges({ Grade: true, Year: true });
    setActiveBrandCard('');
  };

  const handleDisabled = (key: DisabledRangesKey) => {
    setDisabledRanges({ ...disabledRanges, [key]: !disabledRanges[key] });
  };

  const handleRange = (id: string, val: any) => {
    void updateRangeFilters({
      ...rangeFilters,
      [id]: { min: val[0], max: val[1] },
    });
  };

  const removeFilterRange = (id: string) => {
    Object.keys(rangeFilters).length && clearRangeFilters(id);
    Object.keys(rangeFilters).length && delete rangeFilters[id];
  };

  useEffect(() => {
    isReady ? setReady(true) : setReady(false);
    if (isReady) {
      setDisabledRanges({
        Grade: !Object.keys(query).some((key) => key.includes('Grade')) ? true : false,
        Year: !Object.keys(query).some((key) => key.includes('Year')) ? true : false,
      });
    }
  }, [isReady, query]);

  const filterProps = {
    handleFiltersChange,
    clearAllSelectedFilters,
    handleRange,
    removeFilterRange,
    checkedFilters,
    filterRanges: rangeFilters,
    disabledRanges,
    handleDisabled,
  };

  const sortListProps = {
    handleSortType,
  };
  return (
    <Grid
      container
      sx={{
        display: 'root-flow',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Card
        sx={{
          width: '100%',
          marginTop: '10px',
          backgroundColor: 'white',
          maxWidth: '1200px',
          margin: 'auto',
          borderRadius: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 10px',
            width: '100%',
            maxWidth: '1200px',
            margin: 'auto',
            '@media (max-width:400px)': {
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          }}
        >
          <Typography
            variant="h3"
            component={'h3'}
            sx={{ marginRight: 5, fontSize: '1.5rem', whiteSpace: 'nowrap' }}
          >
            Explore Drops
          </Typography>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {mockCategoryFilters.map((filter, index) => (
              <NewFilters
                filterType={filter.filterType}
                filter={filter}
                {...filterProps}
                key={index}
              />
            ))}
            <ClearAllFilter
              clearSelectedFilters={clearAllSelectedFilters}
              isFilterButtonVisible={checkedFilters.length || Object.keys(rangeFilters).length > 0}
            />
            <SortMenu {...sortListProps} />
          </Box>
        </Box>
        <Divider />
      </Card>
    </Grid>
  );
};
