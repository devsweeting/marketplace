import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

/**
 * @jest-environment jsdom
 */

if (typeof window !== 'undefined') {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
}
