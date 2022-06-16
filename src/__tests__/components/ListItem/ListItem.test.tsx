import { ListItem } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';

const MockListItem = () => {
  return <ListItem></ListItem>;
};

//TODO add tests for ListItem
describe('ListItem', () => {
  it('should render', () => {
    render(<MockListItem />);
  });
});
