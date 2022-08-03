import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { IFilter } from 'src/types';

export const FilterGroup: React.FC<any> = ({
  category,
  handleFiltersChange,
  checkedFilters,
}: {
  category: any;
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  checkedFilters: IFilter[];
}) => {
  const { categoryId, filters } = category;

  return (
    <Box style={{ padding: 20 }}>
      {categoryId}
      {filters &&
        filters.map((filter: any, index: any) => {
          return (
            <Box key={`${filter}${index}`} sx={{ display: 'flex' }}>
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedFilters.some(
                          (item: IFilter) =>
                            item.categoryId === categoryId && item.filterId === filter,
                        )}
                        onChange={(ev) => handleFiltersChange(ev, categoryId)}
                        name={filter}
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
