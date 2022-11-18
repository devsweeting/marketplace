import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import type { IUser } from '@/types/user';
import { withTestRouter } from '../../utils/TestRouter';
import user from '@testing-library/user-event';
import type { IAsset } from '@/types/assetTypes';
import { AskingPriceComponent } from '@/components/AskingPriceComponent/AskingPriceComponent';
import { getPurchaseById } from '@/api/endpoints/sellorders';

jest.mock('@/api/endpoints/sellorders');

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
      fractionPriceCents: 3200,
      expireTime: 1698209083032,
      startTime: 1637387070962,
      deletedTime: 0,
      type: 'drop',
      userFractionLimit: 1000,
      userFractionLimitEndTime: '2023-09-20T02:02:50.209Z',
    },
  ],
};
const mockGetPurchaseById = getPurchaseById as jest.MockedFn<typeof getPurchaseById>;

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const push = jest.fn();

const MockAskingPrice = ({
  asset,
  id,
  user,
}: {
  asset: IAsset;
  id: string;
  user: IUser | undefined;
}) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <UserContext.Provider value={{ user, refreshUser: jest.fn(), logout: jest.fn() }}>
        <CartProvider>
          <AskingPriceComponent asset={asset} id={id} />
        </CartProvider>
      </UserContext.Provider>
    </ThemeProvider>,
    { push, asPath: '/account' },
  );
};

describe('Set Asking Price tests', () => {
  beforeEach(() => {
    mockGetPurchaseById.mockResolvedValue([
      {
        id: 'b2c4b39a-f894-45ca-ba93-9ad39eca06f7',
        updatedAt: '2022-11-17T17:39:25.774Z',
        createdAt: '2022-11-17T17:39:25.774Z',
        deletedAt: null,
        isDeleted: false,
        sellOrderId: '4922fbce-1982-4392-a9f8-81049fff89a7',
        userId: 'c39bdd6a-ec54-4053-a349-4bf9011c36af',
        fractionQty: 631,
        fractionPriceCents: 3200,
        assetId: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
      },
    ]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should contain all of the content', async () => {
    render(
      <MockAskingPrice
        user={mockUser}
        asset={mockData}
        id={'4922fbce-1982-4392-a9f8-81049fff89a7'}
      />,
    );
    const confirmation = await screen.findByText(/payment successful/i);
    const thanksNote = await screen.findByText(/thanks for purchasing units/i);
    const instruction = await screen.findByText(
      /we appreciate your order, we’re currently processing it\. so hang tight and we’ll send you confirmation very soon!/i,
    );
    const orderText = await screen.findByText(/order number/i);
    const orderNumber = await screen.findByText(/4922fbce-1982-4392-a9f8-81049fff89a7/i);
    const media = await screen.findByRole('img', { name: /iure omnis sed quia/i });
    const cardTitle = await screen.findByText(/earum est rerum eligendi/i);
    const brand = await screen.findByText(/joe dimaggio/i);
    const valuation = await screen.findByText(/\$20\.2k/i);
    const unitPrice = await screen.findByText(/\$32/i);

    const percentInput = await screen.findByRole('spinbutton', {
      name: /set over the paid price/i,
    });
    const unitPriceInput = await screen.findByRole('spinbutton', { name: /ask price per unit/i });
    const numUnits = await screen.findByText(/631 units/i);
    const estimateValue = await screen.findByText(/\$20,192\.00/i);

    const confirmButton = await screen.findByRole('button', { name: /confirm order/i });

    expect(confirmation).toBeInTheDocument();
    expect(thanksNote).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
    expect(orderText).toBeInTheDocument();
    expect(orderNumber).toBeInTheDocument();
    expect(media).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(valuation).toBeInTheDocument();
    expect(unitPrice).toBeInTheDocument();

    expect(percentInput).toBeInTheDocument();
    expect(unitPriceInput).toBeInTheDocument();
    expect(numUnits).toBeInTheDocument();
    expect(estimateValue).toBeInTheDocument();

    expect(confirmButton).toBeInTheDocument();
  });

  test('should change input values and set estimate Value', async () => {
    render(
      <MockAskingPrice
        user={mockUser}
        asset={mockData}
        id={'4922fbce-1982-4392-a9f8-81049fff89a7'}
      />,
    );
    const closeCart = jest.fn();
    const percentInput = await screen.findByRole('spinbutton', {
      name: /set over the paid price/i,
    });
    const unitPriceInput = await screen.findByRole('spinbutton', { name: /ask price per unit/i });
    const numUnits = await screen.findByText(/631 units/i);
    const estimateValue = await screen.findByText(/\$20,192\.00/i);

    const confirmButton = await screen.findByRole('button', { name: /confirm order/i });

    await user.clear(percentInput);
    await user.tab();
    expect(estimateValue).toHaveTextContent(/~/i);

    await user.type(percentInput, '4');
    await user.tab();
    expect(estimateValue).toHaveTextContent(/\$20,999\.68/i);

    await user.clear(unitPriceInput);
    await user.tab();
    expect(estimateValue).toHaveTextContent(/~/i);

    await user.type(unitPriceInput, '33.71');
    await user.tab();
    expect(estimateValue).toHaveTextContent(/\$21,271\.01/i);
    expect(percentInput).toHaveDisplayValue(/5\.344/i);
    expect(percentInput).toBeInTheDocument();
    expect(unitPriceInput).toBeInTheDocument();
    expect(numUnits).toBeInTheDocument();
    expect(estimateValue).toBeInTheDocument();

    expect(confirmButton).toBeInTheDocument();
  });
});
