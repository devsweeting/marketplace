import { BorderBox } from '@/components/BorderBox/BorderBox';
import { render } from '@testing-library/react';
import React from 'react';

const MockBorderBox = () => {
  return (
    <BorderBox>
      <div>Child</div>
    </BorderBox>
  );
};

//TODO add tests for BorderBox
describe('BorderBox', () => {
  it('should render', () => {
    render(<MockBorderBox />);
  });
});
