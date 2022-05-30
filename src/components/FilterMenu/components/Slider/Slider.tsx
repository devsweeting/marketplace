import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSliderStyles } from './Slider.styles';

const RangeSlider: React.FC<any> = ({ category, handleRange }) => {
  const { categoryId, range } = category;
  const classes = useSliderStyles();

  const [value, setValue] = React.useState<number[]>([
    Number(range[0]),
    Number(range[range.length - 1]),
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    handleRange(newValue, categoryId);
    setValue(newValue as number[]);
  };

  return (
    <Box className={classes.wrapper}>
      <Slider
        getAriaLabel={() => 'Grade'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        min={Number(range[0])}
        max={Number(range[range.length - 1])}
        step={1}
      />
    </Box>
  );
};

export default RangeSlider;
