import { Card } from '@/components/ListItem/components';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';

const CardProps = {
  id: '1',
  refId: '1',
  name: 'Test',
  description: 'Test',
  media: [],
  attributes: [],
  slug: 'test',
  createdAt: '',
  updatedAt: '',
};

const MockBorderBox = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <Card item={CardProps}></Card>
    </ThemeProvider>
  );
};

//TODO add tests for Card
describe('Card', () => {
  it('should render', () => {
    render(<MockBorderBox />);
  });
});
