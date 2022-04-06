import { ProductDataProps } from '../components/ProductCard/ProductCard';

export const mockTraits = {
  blockchain: 'Polygon',
  categories: 'cards',
  contact_id: '0x509a050f573be0d5e01a73c3726e17161729558b',
  supply: '555',
  token_id: '19292',
  token_type: 'ERC-1151',
};

export const mockProductData: ProductDataProps = {
  title: 'Overstreet Comic Book 50th Anniversary 10 GEM MINT',
  watchNumber: 2,
  price: {
    icon: 'etherum',
    cryptoValue: '2.1',
    dolarValue: '6234.33',
  },
  brand: {
    logo: 'brand_a',
    verified: true,
    name: 'Comix',
  },
};

export const mockProducImages = [
  '/images/nftDetail/gallery/product1b.png',
  '/images/nftDetail/gallery/product1a.png',
  '/images/nftDetail/gallery/product1b.png',
];

// export  const mockChartData = [
//   { name: 'Dec 19', uv: 0, pv: 2400, amt: 2400 },
//   { name: 'JAN 02', uv: 500, pv: 323, amt: 2400 },
//   { name: 'JAN 15', uv: 600, pv: 543, amt: 2400 },
//   { name: 'JAN 13', uv: 400, pv: 343, amt: 2400 },
//   { name: 'FEB 27', uv: 200, pv: 190, amt: 2400 },
//   { name: 'MAR 13', uv: 300, pv: 200, amt: 2400 },
// ];

export const mockChartData = [
  {
    name: 'DEC 19',
    uv: 2000,
    pv: 2300,
    amt: 2800,
  },
  {
    name: 'JAN 02',
    uv: 1000,
    pv: 1500,
    amt: 2100,
    cnt: 800,
  },
  {
    name: 'JAN 16',
    uv: 1100,
    pv: 1600,
    amt: 2290,
  },
  {
    name: 'JAN 30',
    uv: 1200,
    pv: 1700,
    amt: 2000,
    cnt: 1080,
  },
  {
    name: 'FEB 13',
    uv: 1200,
    pv: 1600,
    amt: 2181,
    cnt: 900,
  },
  {
    name: 'FEB 27',
    uv: 1800,
    pv: 2400,
    amt: 3300,
    cnt: 1100,
  },
  {
    name: 'MAR 13',
    uv: 1300,
    pv: 1900,
    amt: 2900,
  },
];
