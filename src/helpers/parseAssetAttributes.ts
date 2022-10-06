import type { IAttribute, IAssetDetails } from '../types';

/**
 * parses attributes into an object containing: year, categories, grade, grading service, and set.
 * @param attributes asset attributes
 * @returns Object containing the parsed attributes
 */
export const parseAssetAttributes = (attributes: IAttribute[]): IAssetDetails => {
  const details: IAssetDetails = {
    year: '',
    categories: [],
    set: '',
    grading: '',
    grading_service: '',
  };

  if (attributes.length > 0) {
    attributes.flatMap((attribute) => {
      const value = attribute.value ?? '';
      switch (attribute.trait) {
        case 'year':
          details.year = value;
          break;
        case 'category':
          details.categories.push(value);
          break;
        case 'grade':
          details.grading = value;
          break;
        case 'grading service':
          details.grading_service = value;
          break;
        case 'set':
          details.set = value;
          break;
      }
    });
  }

  return details;
};
