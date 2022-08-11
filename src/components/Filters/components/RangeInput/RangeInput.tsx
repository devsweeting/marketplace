import * as React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import type { RangeFilters, DisabledRanges, DisabledRangesKey } from 'src/types';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const RangeInput: React.FC<any> = ({
  category,
  handleRange,
  removeFilterRange,
  filterRanges,
  handleDisabled,
  disabledRanges,
}: {
  category: { categoryId: DisabledRangesKey; range: string[] };
  handleRange: (id: string, val: number | number[]) => void;
  removeFilterRange: (id: string) => void;
  filterRanges: RangeFilters;
  handleDisabled: (key: keyof DisabledRanges) => void;
  disabledRanges: DisabledRanges;
}) => {
  const { categoryId, range } = category;

  const [rangeValueOne, setRangeValueOne] = React.useState<number>(Number(range![0]));
  const [rangeValueTwo, setRangeValueTwo] = React.useState<number>(
    Number(range![range!.length - 1]),
  );
  const [value, setValue] = React.useState<number[]>([
    Number(range![0]),
    Number(range![range!.length - 1]),
  ]);

  const handleClick = () => {
    setValue([rangeValueOne, rangeValueTwo]);
    handleRange(categoryId as string, value);
    handleDisabled(categoryId);
  };

  React.useEffect(() => {
    if (!filterRanges) {
      setValue([Number(range![0]), Number(range![range!.length - 1])]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRanges]);

  React.useEffect(() => {
    !disabledRanges[categoryId] && handleRange(categoryId as string, value);
    disabledRanges[categoryId] && removeFilterRange(categoryId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledRanges[categoryId]]);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
      }}
    >
      {categoryId}
      <TextField
        type="number"
        value={rangeValueOne}
        onChange={(newValue) => setRangeValueOne(parseInt(newValue.target.value))}
        defaultValue="Small"
        label="From"
        variant="outlined"
        size="small"
        InputProps={{
          inputProps: {
            min: Number(range![0]),
            max: Number(range![range!.length - 2]),
            step: 1,
          },
        }}
        style={{ margin: 20 }}
      />
      <TextField
        type="number"
        value={rangeValueTwo}
        onChange={(newValue) => setRangeValueTwo(parseInt(newValue.target.value))}
        defaultValue="Small"
        label="To"
        variant="outlined"
        size="small"
        InputProps={{
          inputProps: {
            min: Number(range![0]),
            max: Number(range![range!.length - 1]),
            step: 1,
          },
        }}
        style={{ margin: 20 }}
      />
      <Button onClick={handleClick} style={{ padding: 20 }}>
        <Typography>{disabledRanges[categoryId] ? 'Apply' : 'Remove'}</Typography>
      </Button>
    </Box>
  );
};
