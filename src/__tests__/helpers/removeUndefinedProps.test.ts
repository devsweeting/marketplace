import { removeUndefinedProps } from '@/helpers/removeUndefinedProps';

const props = {};

//TODO write tests for removeUndefinedProps
describe('removeUndefinedProps', () => {
  test('should remove undefined keys', () => {
    const result = removeUndefinedProps(props);
    expect(result);
  });
});
