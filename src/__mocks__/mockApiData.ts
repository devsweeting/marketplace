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
