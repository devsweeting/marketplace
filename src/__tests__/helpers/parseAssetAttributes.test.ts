import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';

const mockAttributes = [
  {
    trait: 'Category',
    value: 'Basketball',
    display: null,
  },
  {
    trait: 'Grade',
    value: '10',
    display: null,
  },
  {
    trait: 'Grading Service',
    value: 'BGS',
    display: null,
  },
  {
    trait: 'Grading Service Serial',
    value: '0006574724',
    display: null,
  },
  {
    trait: 'Year',
    value: '1996',
    display: 'number',
  },
];

const mockResponse = {
  year: '1996',
  categories: ['Basketball'],
  set: '',
  grading: '10',
  grading_service: 'BGS',
};
describe('parseAssetAttributes', () => {
  test('should correctly parse asset attributes into a details object', () => {
    const details = parseAssetAttributes(mockAttributes);
    expect(details).toEqual(mockResponse);
  });

  test('should return an empty details object if no attributes are supplied', () => {
    const details = parseAssetAttributes([]);
    expect(details).toEqual({
      year: '',
      set: '',
      categories: [],
      grading: '',
      grading_service: '',
    });
  });

  test('should return an a partially completed object for partial data', () => {
    const details = parseAssetAttributes([
      {
        trait: 'Year',
        value: '1996',
        display: 'number',
      },
    ]);
    expect(details).toEqual({
      year: '1996',
      set: '',
      categories: [],
      grading: '',
      grading_service: '',
    });
  });
});
