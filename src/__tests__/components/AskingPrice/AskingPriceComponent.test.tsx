import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { StatusCodes } from 'http-status-codes';
import { apiClient } from '@/api/client';
import { UserContext } from '@/helpers/auth/UserContext';
import type { IUser } from '@/types/user';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';
import { withTestRouter } from '../../utils/TestRouter';
import user from '@testing-library/user-event';
import type { IAsset } from '@/types/assetTypes';
import { AskingPriceComponent } from '@/components/AskingPriceComponent/AskingPriceComponent';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { getPurchaseById } from '@/api/endpoints/sellorders';

jest.mock('@/api/client');
jest.mock('@/api/endpoints/sellorders');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;
const mockData = mockAssetResponse.items[0];
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
        <AskingPriceComponent asset={asset} id={id} />
      </UserContext.Provider>
    </ThemeProvider>,
    { push, asPath: '/account' },
  );
};

describe('Set Asking Price tests', () => {
  test('should contain all of the content', async () => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: jest.fn(),
    }));
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
    await render(<MockAskingPrice user={mockUser} asset={mockData} id={mockData.id} />);
  });
});
