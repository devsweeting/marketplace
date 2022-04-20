import React, { useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import Box from '@mui/material/Box';
import { SearchBox } from '../../components/SearchBox';
import Typography from '@mui/material/Typography';
import { FilterGroup } from './components/FilterGroup';
import { BorderBox } from '../BorderBox/BorderBox';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FilterMenu: React.FC<any> = ({
  categoriesList,
  handleFiltersChange,
  checkedFilters,
}) => {
  const { skin } = useContext(SkinContext);
  return (
    <>
      {categoriesList.map((category: any, index: any) => {
        return (
          <BorderBox bottom={4} right={4} key={`${category}${index}`}>
            <>
              <Accordion
                disableGutters={true}
                sx={{ boxShadow: 'none', background: skin.listItem.filterBackgroundColor }}
              >
                <AccordionSummary
                  sx={{ paddingLeft: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  // id="panel1bh-header"
                >
                  <Typography variant="h3" component="h3">
                    {category.categoryName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <Box>
                    <Box mb={2} mr={2.5}>
                      <SearchBox placeholder={'Search CATEGORY'} />
                    </Box>
                    <FilterGroup
                      category={category}
                      handleFiltersChange={handleFiltersChange}
                      checkedFilters={checkedFilters}
                    />
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
