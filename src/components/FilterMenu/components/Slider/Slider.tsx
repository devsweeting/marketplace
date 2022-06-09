import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { useSliderStyles } from './Slider.styles';
import { RangeFilters, DisabledRanges, DisabledRangesKey } from 'src/types';

const filterRangeslider: React.FC<any> = ({
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
  const classes = useSliderStyles();

  const [value, setValue] = React.useState<number[]>([
    Number(range![0]),
    Number(range![range!.length - 1]),
  ]);

  React.useEffect(() => {
    if (!filterRanges) {
      setValue([Number(range![0]), Number(range![range!.length - 1])]);
    }
  }, [filterRanges]);

  const handleChange = (event: any, newValue: number | number[]) => {
    handleRange(categoryId, newValue);
  };

  const handleRangeLocally = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  React.useEffect(() => {
    !disabledRanges[categoryId] && handleRange(categoryId, value);
    disabledRanges[categoryId] && removeFilterRange(categoryId);
  }, [disabledRanges[categoryId]]);

  return (
    <Box className={classes.wrapper}>
      <Slider
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

export default filterRangeslider;
