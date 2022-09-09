import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFilters } from '@/helpers/hooks/useFilters';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import type { DisabledRanges, DisabledRangesKey, IFilter } from '@/types/assetTypes';
import { NewFilters } from '@/components/NewFilters/NewFilters';
import { ClearAllFilter } from '@/components/NewFilters/components/ClearAllFilter';
import { SortMenu } from '@/components/NewFilters/components/SortMenu';
import { useFilterWrapperStyles } from './FilterWrapper.styles';

export const FilterWrapper = () => {
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useFilterWrapperStyles();
  const router = useRouter();
  const { isReady, query } = router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ready, setReady] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeBrandCard, setActiveBrandCard] = useState<string>('');
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    <>
      {matchesDesktop ? (
        <Grid container className={classes.desktopFilterWrapperWrapper}>
          <Card className={classes.desktopFilterCard}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                width: '100%',
              }}
            >
              <Typography
                variant="h3"
                component={'h3'}
                sx={{ marginLeft: 1.2, marginRight: 1.2, fontSize: '1.3rem', whiteSpace: 'nowrap' }}
              >
                {router.asPath.includes('/search') ? 'Search Results' : 'Explore Drops'}
              </Typography>

              <Box
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
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
                  isFilterButtonVisible={
                    checkedFilters.length || Object.keys(rangeFilters).length > 0
                  }
                />
                <SortMenu {...sortListProps} />
              </Box>
            </Box>
          </Card>
        </Grid>
      ) : (
        <Grid className={classes.mobileFilterWrapperWrapper}>
          <Card className={classes.mobileFilterCard}>
            <Box
              sx={{
                paddingTop: '20px',
                width: '100%',
              }}
            >
              <div className={classes.mobileFilterHead}>
                <Typography variant="h3" component={'h3'} className={classes.mobileHeader}>
                  Explore Drops
                </Typography>
                <ClearAllFilter
                  clearSelectedFilters={clearAllSelectedFilters}
                  isFilterButtonVisible={
                    checkedFilters.length || Object.keys(rangeFilters).length > 0
                  }
                />
              </div>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary
                  sx={{
                    background: expanded !== 'panel1' ? 'whitesmoke' : 'white',
                    '.Mui-expanded': {
                      margin: 0,
                    },
                  }}
                  expandIcon={
                    expanded === 'panel1' ? (
                      <RemoveIcon sx={{ color: theme.palette.primary.main }} />
                    ) : (
                      <AddIcon sx={{ color: theme.palette.primary.main }} />
                    )
                  }
                >
                  Filter Menu
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.mobileFilterStyles}>
                    {mockCategoryFilters.map((filter, index) => (
                      <NewFilters
                        filterType={filter.filterType}
                        filter={filter}
                        {...filterProps}
                        key={index}
                      />
                    ))}

                    <SortMenu {...sortListProps} />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Divider />
          </Card>
        </Grid>
      )}
    </>
  );
};
