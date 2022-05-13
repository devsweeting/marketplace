import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const FilterGroup: React.FC<any> = ({ category, handleFiltersChange, checkedFilters }) => {
  const { categoryId, categoryName, filters } = category;

  return (
    <Box>
      {filters.map((filter: any, index: any) => {
        return (
          <Box key={`${filter}${index}`} sx={{ display: 'flex' }}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilters.includes(`${categoryId}^${filter.toLowerCase()}`)}
                      onChange={handleFiltersChange}
                      name={`${categoryId}^${filter.toLowerCase()}`}
                    />
                  }
                  label={filter}
                />
              </FormGroup>
            </FormControl>
          </Box>
        );
      })}
    </Box>
  );
};
