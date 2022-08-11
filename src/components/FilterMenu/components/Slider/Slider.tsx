import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import MaterialSlider from '@mui/material/Slider';
import { useSliderStyles } from './Slider.styles';
import type { RangeFilters, DisabledRanges, DisabledRangesKey } from 'src/types';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const Slider: React.FC<any> = ({
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
  const { categoryId, range }: { categoryId: string | number; range: string[] } = category;
  categoryId as string;
  const classes = useSliderStyles();

  const [value, setValue] = React.useState<number[]>([
    Number(range![0]),
    Number(range![range!.length - 1]),
  ]);

  React.useEffect(() => {
    if (!filterRanges) {
      setValue([Number(range![0]), Number(range![range!.length - 1])]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRanges]);

  const handleChange = (event: any, newValue: number | number[]) => {
    handleRange(categoryId as string, newValue);
  };

  const handleRangeLocally = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  React.useEffect(() => {
    !disabledRanges[categoryId] && handleRange(categoryId as string, value);
    disabledRanges[categoryId] && removeFilterRange(categoryId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledRanges[categoryId]]);

  return (
    <Box className={classes.wrapper}>
      <MaterialSlider
        getAriaLabel={() => 'Grade'}
        value={value}
        onChange={handleRangeLocally}
        onChangeCommitted={handleChange}
        valueLabelDisplay="on"
        min={Number(range![0])}
        max={Number(range![range!.length - 1])}
        step={1}
        disabled={!!disabledRanges[categoryId]}
      />
      <Stack direction="row" justifyContent="flex-end" alignItems="center" mr={'-19px'}>
        <Typography>{disabledRanges[categoryId] ? 'Off' : 'On'}</Typography>
        <Switch
          className={classes.switch}
          checked={!!disabledRanges[categoryId]}
          inputProps={{ 'aria-label': 'switch' }}
          onChange={() => handleDisabled(categoryId)}
        />
      </Stack>
    </Box>
  );
};
