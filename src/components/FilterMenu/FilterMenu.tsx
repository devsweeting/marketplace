import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SkinContext } from '@/styles/skin-context';
import { BorderBox } from '../BorderBox/BorderBox';
import { FilterGroup } from './components/FilterGroup';
import Slider from './components/Slider';
import type { IFilter, RangeFilters, DisabledRanges, DisabledRangesKey } from 'src/types';

export interface FilterMenuProps {
  categoriesList: any;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  checkedFilters: IFilter[];
  handleRange: (id: string, val: number[]) => void;
  removeFilterRange: (id: string) => void;
  filterRanges: RangeFilters;
  disabledRanges: DisabledRanges;
  handleDisabled: (key: DisabledRangesKey) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  categoriesList,
  handleFiltersChange,
  checkedFilters,
  handleRange,
  removeFilterRange,
  handleDisabled,
  filterRanges,
  disabledRanges,
}) => {
  const { skin } = useContext(SkinContext);
  return (
    <>
      {categoriesList.map((category: any, index: any) => {
        return (
          <BorderBox bottom={4} right={skin.sidebar.borderRight} key={`${category}${index}`}>
            <>
              <Accordion
                disableGutters={true}
                sx={{ boxShadow: 'none', background: skin.listItem.filterBackgroundColor }}
              >
                <AccordionSummary
                  sx={{ paddingLeft: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                >
                  <Typography variant="h3" component="h3">
                    {category.categoryName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <Box>
                    {category.filterType === 'checkbox' && (
                      <FilterGroup
                        category={category}
                        handleFiltersChange={handleFiltersChange}
                        checkedFilters={checkedFilters}
                      />
                    )}
                    {category.filterType === 'slider' && (
                      <Slider
                        category={category}
                        handleFiltersChange={handleFiltersChange}
                        handleRange={handleRange}
                        removeFilterRange={removeFilterRange}
                        filterRanges={filterRanges}
                        handleDisabled={handleDisabled}
                        disabledRanges={disabledRanges}
                      />
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </>
          </BorderBox>
        );
      })}
    </>
  );
};
