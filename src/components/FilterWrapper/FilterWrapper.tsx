import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFilters } from '@/helpers/hooks/useFilters';
import { mockCategoryFilters } from '@/__mocks__/mockCategoryViewApiData';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import type { DisabledRanges, DisabledRangesKey, IFilter } from '@/types';
import { NewFilters } from '@/components/NewFilters/NewFilters';
import { ClearAllFilter } from '@/components/NewFilters/components/ClearAllFilter';
import { SortMenu } from '@/components/NewFilters/components/SortMenu';
import {
  MobileFilterContainer,
  MobileFilterHead,
  FilterContainer,
  DesktopFilterContainer,
  Header,
} from './FilterWrapper.styles';

export const FilterWrapper = () => {
  const theme = useTheme();
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'));
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
        <DesktopFilterContainer>
          <Header variant="xl" sx={{ margin: 0 }}>
            {router.asPath.includes('/search') ? 'Search Results' : 'Explore Drops'}
          </Header>

          <FilterContainer>
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
          </FilterContainer>
          <SortMenu {...sortListProps} />
        </DesktopFilterContainer>
      ) : (
        <MobileFilterContainer>
          <MobileFilterHead>
            <Header variant="xl">Explore Drops</Header>
            <ClearAllFilter
              clearSelectedFilters={clearAllSelectedFilters}
              isFilterButtonVisible={checkedFilters.length || Object.keys(rangeFilters).length > 0}
            />
          </MobileFilterHead>
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
              <FilterContainer>
                {mockCategoryFilters.map((filter, index) => (
                  <NewFilters
                    filterType={filter.filterType}
                    filter={filter}
                    {...filterProps}
                    key={index}
                  />
                ))}

                <SortMenu {...sortListProps} />
              </FilterContainer>
            </AccordionDetails>
          </Accordion>
        </MobileFilterContainer>
      )}
    </>
  );
};
