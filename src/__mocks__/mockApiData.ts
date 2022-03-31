import { ProductDataProps } from '../components/ProductCard/ProductCard';

export const blockchaninDataInfo = [
  { name: 'Contract ID', value: '0x509a050f573be0d5e01a73c3726e17161729558b' },
  { name: 'Token ID', value: '19292' },
  { name: 'Token Type', value: 'ERC-1151' },
  { name: 'Token Type', value: 'ERC-1151' },
  { name: 'Supply', value: '1' },
  { name: 'Blockchain', value: 'Polygon' },
];

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

export const mockChartData = [
  { name: 'Dec 19', uv: 400, pv: 2400, amt: 2400 },
  { name: 'JAN 02', uv: 500, pv: 2400, amt: 2400 },
  { name: 'JAN 15', uv: 600, pv: 2400, amt: 2400 },
  { name: 'JAN 13', uv: 400, pv: 2400, amt: 2400 },
  { name: 'FEB 27', uv: 200, pv: 2400, amt: 2400 },
  { name: 'MAR 13', uv: 300, pv: 2400, amt: 2400 },
];
