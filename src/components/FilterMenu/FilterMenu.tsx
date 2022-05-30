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
