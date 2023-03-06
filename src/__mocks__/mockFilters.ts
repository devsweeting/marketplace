const getCurrentYear = new Date().getFullYear();
const generateYears = (min: number, max = getCurrentYear + 1) => {
  const years = [];
  for (let i = min; i <= max; i++) {
    years.push(i.toString());
  }

  return years;
};

export const mockFilterResponse = {
  range: [
    {
      categoryName: 'grade',
      filterType: 'slider',
      categoryId: 'grade',
      range: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    },
    { categoryName: 'Year', filterType: 'slider', categoryId: 'Year', range: generateYears(1800) },
  ],
  checkbox: [
    {
      categoryName: 'Category',
      filterType: 'checkbox',
      categoryId: 'Category',
      filters: ['Baseball', 'Basketball'],
    },
    {
      categoryName: 'grading service',
      filterType: 'checkbox',
      categoryId: 'grading service',
      filters: ['PSA', 'BGS'],
    },
  ],
};
