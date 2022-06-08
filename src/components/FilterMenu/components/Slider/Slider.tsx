import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { useSliderStyles } from './Slider.styles';
import { RangeFilters, DisabledRanges } from 'src/types';

const filterRangeslider: React.FC<any> = ({
  category,
  handleRange,
  removeFilterRange,
  filterRanges,
  handleDisabled,
  disabledRanges,
}: {
  category: any;
  handleRange: (id: string, val: number | number[]) => void;
  removeFilterRange: (id: string) => void;
  filterRanges: RangeFilters;
  handleDisabled: (key: any) => void;
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
    !disabledRanges[categoryId as keyof DisabledRanges] && handleRange(categoryId, value);
    disabledRanges[categoryId as keyof DisabledRanges] && removeFilterRange(categoryId);
  }, [disabledRanges[categoryId as keyof DisabledRanges]]);

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
        disabled={!!disabledRanges[categoryId as keyof DisabledRanges]}
      />
      <Stack direction="row" justifyContent="flex-end" alignItems="center" mr={'-19px'}>
        <Typography>{disabledRanges[categoryId as keyof DisabledRanges] ? 'Off' : 'On'}</Typography>
        <Switch
          className={classes.switch}
          checked={!!disabledRanges[categoryId as keyof DisabledRanges]}
          inputProps={{ 'aria-label': 'switch' }}
          onChange={() => handleDisabled(categoryId)}
        />
      </Stack>
    </Box>
  );
};

export default filterRangeslider;
