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
      categoryName: 'Grade',
      filterType: 'slider',
      categoryId: 'Grade',
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
      categoryName: 'Grading Service',
      filterType: 'checkbox',
      categoryId: 'Grading Service',
      filters: ['PSA', 'BGS'],
    },
  ],
};
