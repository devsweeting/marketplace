import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import user from '@testing-library/user-event';
import { setLocalStorage } from '@/helpers/mockLocalStorage';
import { PaymentService } from '@/components/Checkout/PaymentService';
import { TestRouter } from '@/__tests__/utils/TestRouter';
import { apiClient } from '@/api/client';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';

jest.mock('@/api/client');
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

jest.mock('@/api/endpoints/sellorders');

const mockId = '@local-cart';
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
const mockJson = [
  {
    id: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
    quantity: 400,
    fractionPriceCents: 7500,
    totalPrice: 30000,
  },
];

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const push = jest.fn();

const MockPaymentService = ({ setPage }: { setPage: () => void }) => {
  return (
    <TestRouter router={{ push, asPath: '/askingprice' }}>
      <ThemeProvider theme={themeJump}>
        <UserContext.Provider value={{ user: mockUser, refreshUser: jest.fn(), logout: jest.fn() }}>
          <CartProvider>
            <PaymentService setPage={setPage} orderSummary={mockData} />
          </CartProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </TestRouter>
  );
};

describe('Payment service', () => {
  jest.mock('@/api/endpoints/sellorders');
  beforeEach(() => {
    setLocalStorage(mockId, mockJson);
    mockedClient.get.mockResolvedValue(mockJsonResponse());
  });

  afterEach(() => {
    window.localStorage.clear();
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  test('Should render out all of the content', async () => {
    const setPage = jest.fn();
    render(<MockPaymentService setPage={setPage} />);
    const cardNumberInput = await screen.findByRole('textbox', {
      name: /card number/i,
    });
    const nameOnCardInput = await screen.findByRole('textbox', {
      name: /name on card/i,
    });
    const expirationDateInput = await screen.findByRole('textbox', {
      name: /expiration date \(mm\/yyyy\)/i,
    });
    const cardCvvInput = await screen.findByRole('textbox', {
      name: /CVV/i,
    });
    const confirmButton = await screen.findByRole('button', {
      name: /confirm order/i,
    });
    const units = await screen.findByText(/400 units/i);
    const valuation = await screen.findByText(/\$30,000/i);
    const totalAfterFees = await screen.findByText(/\$34500\.25/i);
    const elements = [
      cardNumberInput,
      nameOnCardInput,
      expirationDateInput,
      cardCvvInput,
      confirmButton,
      units,
      valuation,
      totalAfterFees,
    ];
    elements.forEach((element) => {
      if (elements.length > 0) {
        return expect(element).toBeInTheDocument();
      } else {
        return fail('it should not reach here');
      }
    });
  });

  test('Should reveal hidden validation helper text', async () => {
    const setPage = jest.fn();

    render(<MockPaymentService setPage={setPage} />);
    const cardNumberInput = await screen.findByRole('textbox', {
      name: /card number/i,
    });
    const nameOnCardInput = await screen.findByRole('textbox', {
      name: /name on card/i,
    });
    const expirationDateInput = await screen.findByRole('textbox', {
      name: /expiration date \(mm\/yyyy\)/i,
    });
    const cardCvvInput = await screen.findByRole('textbox', {
      name: /CVV/i,
    });
    const confirmButton = await screen.findByRole('button', {
      name: /confirm order/i,
    });

    await user.type(cardNumberInput, ' ');
    await user.type(nameOnCardInput, ' ');
    await user.type(cardCvvInput, ' ');
    await user.type(expirationDateInput, ' ');

    expect(await screen.findByText(/card number is invalid/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/name on card can't be empty or contain invalid characters/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/name on card can't be empty or contain invalid characters/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/please select a valid expiry date/i)).toBeInTheDocument();
    expect(await screen.findByText(/cvv is invalid/i)).toBeInTheDocument();
    expect(confirmButton).toBeDisabled();
  });

  test('Should allow purchase if fields are valid', async () => {
    const setPage = jest.fn();

    render(<MockPaymentService setPage={setPage} />);
    const cardNumberInput = await screen.findByRole('textbox', {
      name: /card number/i,
    });
    const nameOnCardInput = await screen.findByRole('textbox', {
      name: /name on card/i,
    });
    const expirationDateInput = await screen.findByRole('textbox', {
      name: /expiration date \(mm\/yyyy\)/i,
    });
    const cardCvvInput = await screen.findByRole('textbox', {
      name: /CVV/i,
    });
    const confirmButton = await screen.findByRole('button', {
      name: /confirm order/i,
    });

    await user.type(cardNumberInput, '4111 1111 1111 1111');
    await user.type(nameOnCardInput, 'John Doe');
    await user.type(cardCvvInput, '444');
    await user.type(expirationDateInput, '12/2024');

    expect(confirmButton).not.toBeDisabled();
    await user.click(confirmButton);
    expect(push).toHaveBeenCalledTimes(1);
  });
});
