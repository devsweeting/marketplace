import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { useSliderStyles } from './Slider.styles';
import { RangeFilters } from 'src/types';

const filterRangeslider: React.FC<any> = ({
  category,
  handleRange,
  removeFilterRange,
  filterRanges,
}: {
  category: any;
  handleRange: (id: string, val: number | number[]) => void;
  removeFilterRange: (id: string) => void;
  filterRanges: RangeFilters;
}) => {
  const { categoryId, range } = category;
  const classes = useSliderStyles();

  const [disabled, setDisabled] = React.useState<boolean>(false);
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

  const handleDisabled = () => {
    setDisabled(!disabled);
    handleRange(categoryId, value);
  };

  React.useEffect(() => {
    disabled && removeFilterRange(categoryId);
  }, [disabled]);

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
        disabled={disabled}
      />
      <Stack direction="row" justifyContent="flex-end" alignItems="center" mr={'-19px'}>
        <Typography>{disabled ? 'Off' : 'On'}</Typography>
        <Switch
          className={classes.switch}
          defaultChecked
          inputProps={{ 'aria-label': 'switch' }}
          onChange={handleDisabled}
        />
      </Stack>
    </Box>
  );
};

export default filterRangeslider;
