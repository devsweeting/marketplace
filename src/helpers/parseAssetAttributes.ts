import type { IAttribute } from '../types';

/**
 * parses attributes into an object containing: year, categories, grade, grading service, and set.
 * @param attributes asset attributes
 * @returns Object containing the parsed attributes
 */
interface IAssetDetails {
  year: string;
  categories: string[];
  set: string;
  grading: string;
  grading_service: string;
  producer: string;
  brand: string;
  cardNumber: string;
}
export const parseAssetAttributes = (attributes: IAttribute[]): IAssetDetails => {
  const details = {
    year: '',
    categories: [] as string[],
    set: '',
    grading: '',
    grading_service: '',
    producer: '',
    brand: '',
    cardNumber: '',
  };

  if (attributes.length > 0) {
    attributes.flatMap((attribute) => {
      const value = attribute.value ?? '';
      switch (attribute.trait.toLowerCase()) {
        case 'year': {
          details.year = value as string;
          break;
        }
        case 'category': {
          details.categories.push(value as string);
          break;
        }
        case 'grade': {
          details.grading = value as string;
          break;
        }
        case 'grading service': {
          details.grading_service = value as string;
          break;
        }
        case 'producer': {
          details.set = value as string;
          break;
        }
        case 'brand': {
          details.brand = value as string;
          break;
        }
        case 'card number': {
          details.cardNumber = value as string;
          break;
        }
      }
    });
  }

  return details;
};
