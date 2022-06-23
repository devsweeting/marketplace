import { Slider } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';

const MockSlider = () => {
  return <Slider></Slider>;
};

//TODO add tests for Slider
describe('Slider', () => {
  it('should render', () => {
    render(<MockSlider />);
  });
});
