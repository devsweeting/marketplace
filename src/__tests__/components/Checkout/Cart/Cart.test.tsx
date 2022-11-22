import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import user from '@testing-library/user-event';
import type { IAsset } from '@/types/assetTypes';
import type { CartItem } from '@/helpers/auth/CartContext';
import { Cart } from '@/components/Checkout/Cart';

jest.mock('@/api/endpoints/sellorders');

const localStorageMock = (function () {
  let store: { [key: string]: CartItem[] } = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: CartItem[]) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
    getAll() {
      return store;
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (
  id: string,
  data: { id: string; quantity: number; fractionPriceCents: number; totalPrice: number }[],
) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

const mockId = '@local-cart';
const mockJson = [
  {
    id: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
    quantity: 400,
    fractionPriceCents: 7500,
    totalPrice: 30000,
  },
];

const mockData = {
  id: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
  name: 'earum est rerum eligendi',
  description: 'Aliquid ea qui nulla ex accusamus quis iusto alias accusamus.',
  media: [
    {
      id: 'c30c7dab-a013-44e8-976d-c7ab5f471b4e',
      title: 'iure omnis sed quia',
      description: 'ipsam et sed hic',
      sourceUrl: 'https://loremflickr.com/640/480',
      sortOrder: 3,
      assetId: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
      fileId: '1d62f6dc-2860-43fd-8ff8-fcd0951e3875',
      file: 'http://localhost:4566/test-bucket/assets/fbb1a80f-41e2-47e9-9adb-cce684ec507c/8a8df463-81af-4572-8d10-389b3a6d78db',
      absoluteUrl:
        'http://localhost:4566/test-bucket/assets/fbb1a80f-41e2-47e9-9adb-cce684ec507c/8a8df463-81af-4572-8d10-389b3a6d78db',
    },
  ],
  refId: '8tl90grn',
  slug: 'earum-est-rerum-eligendi',
  createdAt: '2022-11-04T13:56:47.104Z',
  updatedAt: '2022-11-04T13:56:47.104Z',
  attributes: [
    {
      trait: 'brand',
      value: 'Joe DiMaggio',
      display: null,
    },
    {
      trait: 'card number',
      value: '#610',
      display: null,
    },
    {
      trait: 'category',
      value: 'Basketball',
      display: null,
    },
    {
      trait: 'grade',
      value: 3,
      display: null,
    },
    {
      trait: 'grading service',
      value: 'BGS',
      display: null,
    },
    {
      trait: 'producer',
      value: 'Upper Deck',
      display: null,
    },
    {
      trait: 'year',
      value: 2004,
      display: null,
    },
  ],
  partner: 'OW9Loe9gogS9ENAN918Oh7QaePd',
  sellOrders: [
    {
      id: '4922fbce-1982-4392-a9f8-81049fff89a7',
      assetId: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
      userId: '2c17b3a3-5158-4d9b-8032-b5616d57d6f9',
      partnerId: '190c44f7-e82e-4bf8-bad2-d942038b5103',
      fractionQty: 59937,
      fractionQtyAvailable: 59306,
      fractionPriceCents: 7500,
      expireTime: 1698209083032,
      startTime: 1637387070962,
      deletedTime: 0,
      type: 'drop',
      userFractionLimit: 1000,
      userFractionLimitEndTime: '2023-09-20T02:02:50.209Z',
    },
  ],
};

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const MockCart = ({ orderSummary, setPage }: { orderSummary: IAsset; setPage: () => void }) => (
  <ThemeProvider theme={themeJump}>
    <UserContext.Provider value={{ user: mockUser, refreshUser: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <Cart orderSummary={orderSummary} page={0} setPage={setPage} />
      </CartProvider>
    </UserContext.Provider>
  </ThemeProvider>
);

describe('Cart', () => {
  beforeEach(() => {
    setLocalStorage(mockId, mockJson);
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('should render all available cart content', async () => {
    const setPage = jest.fn();
    render(<MockCart orderSummary={mockData} setPage={setPage} />);
    const presentation = await screen.findByRole('presentation');
    const backButton = await screen.findByRole('button', {
      name: /close cart modal/i,
    });
    const removeFromCartButton = await screen.findByRole('button', {
      name: /remove from cart/i,
    });
    const removeItemFromCartButton = await screen.findByRole('button', {
      name: /remove item from cart/i,
    });
    const image = await screen.findByRole('img', {
      name: /iure omnis sed quia/i,
    });
    const assetTitle = await screen.findByText(/earum est rerum eligendi/i);

    const brand = await within(presentation).findByText(/Joe DiMaggio/i);
    const cardNumber = await within(presentation).findByText(/#610/i);
    const grade = await within(presentation).findByText(/^3$/i);
    const category = await within(presentation).findByText(/Basketball/i);
    const producer = await within(presentation).findByText(/Upper Deck/i);
    const gradingService = await within(presentation).findByText(/BGS/i);
    const year = await within(presentation).findByText(/2004/i);
    const orderSummaryText = await screen.findByText(/order summary/i);
    const numberOfUnits = await screen.findByText(/400 units/i);
    const valuation = await screen.findByText(/\$30,000/i);
    const buyNowButton = await screen.findByRole('button', { name: /buy now/i });
    const elementsArray = [
      backButton,
      buyNowButton,
      valuation,
      numberOfUnits,
      orderSummaryText,
      year,
      gradingService,
      producer,
      category,
      grade,
      cardNumber,
      brand,
      assetTitle,
      image,
      removeFromCartButton,
      removeItemFromCartButton,
    ];
    for (const element of elementsArray) {
      if (elementsArray.length > 0) {
        return expect(element).toBeInTheDocument();
      }
    }
  });
  test('should buy button', async () => {
    const setPage = jest.fn();
    render(<MockCart orderSummary={mockData} setPage={setPage} />);

    const buyNowButton = await screen.findByRole('button', { name: /buy now/i });

    await user.click(buyNowButton);
    expect(setPage).toHaveBeenCalledTimes(1);
  });
});
