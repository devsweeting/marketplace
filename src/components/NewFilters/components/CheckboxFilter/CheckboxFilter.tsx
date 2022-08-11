import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import type { IFilter } from '@/types/assetTypes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

interface ICheckBoxStuff {
  categoryId: string;
  event: React.ChangeEvent<HTMLInputElement>;
}
export const CheckboxFilter = ({
  handleFiltersChange,
  checkedFilters,
  filter,
}: {
  handleFiltersChange: (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => void;
  checkedFilters: IFilter[];
  filter:
    | {
        categoryName: string;
        filterType: string;
        categoryId: string;
        filters: string[];
        range?: undefined;
      }
    | {
        categoryName: string;
        filterType: string;
        categoryId: string;
        range: string[];
        filters?: undefined;
      };
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkedBoxes, setCheckedBoxes] = useState<ICheckBoxStuff[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const checkedData = { event: event, categoryId: categoryId };
    const index = checkedBoxes.findIndex((checkbox) => checkbox.categoryId === categoryId);
    if (index === -1) {
      checkedBoxes.push(checkedData);
    } else {
      checkedBoxes[index] = checkedData;
    }
    if (checkedBoxes) {
      checkedBoxes.map(({ event, categoryId }) => handleFiltersChange(event, categoryId));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? `${filter.categoryId}` : undefined;

  return (
    <Box>
      <Button
        className="filterButton"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
      >
        {filter.categoryId}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {filter.filters &&
          filter.filters.map((checkBoxName: string, index: number) => (
            <FormControl component="fieldset" variant="standard" key={index}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilters.some(
                        (item) =>
                          item.categoryId === filter.categoryId && item.filterId === checkBoxName,
                      )}
                      onChange={(event) => handleCheckboxClick(event, filter.categoryId)}
                      name={checkBoxName}
                    />
                  }
                  label={checkBoxName}
                />
              </FormGroup>
            </FormControl>
          ))}
      </Popover>
    </Box>
  );
};
