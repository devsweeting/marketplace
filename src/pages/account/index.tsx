import { OpenGraph } from '@/components/OpenGraph';
import { Loader } from '@/components/Loader';
import type { NextPage } from 'next/types';
import { getPortfolioAssetsByUserId } from '@/api/endpoints/portfolio';
import React, { useEffect, useReducer } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { PortfolioHeader } from '@/components/PortfolioPage/PortfolioHeader';
import { PortFolioStats } from '@/components/PortfolioPage/PortfolioStats/PortFolioStats';
import { PortfolioAssetList } from '@/components/PortfolioPage/PortfolioAssetList';

export type IPorfolioAsset = IAsset & {
  fractionPriceCents: number | undefined;
  fractionQty: number | undefined;
};
interface IPurchaseHistoryItem {
  length: number;
  asset: IPorfolioAsset;
  assetId?: string;
  createdAt?: string;
  deletedAt?: string | null;
  fractionPriceCents?: number;
  fractionQty?: number;
  id?: string;
  isDelete?: boolean;
  purchaseTotal?: number;
  sellOrderId?: string;
  updatedAt?: string;
  userId?: string;
}
export interface IPortfolioData {
  totalValueInCents: number;
  totalUnits: number;
  purchaseHistory?: IPurchaseHistoryItem[] | [];
  sellOrderHistory: [];
}

interface IPortfolioDataState {
  isLoading: boolean;
  portfolio: IPortfolioData;
  error: string;
}

type PortfolioListAction =
  | { type: 'fetching' }
  | { type: 'success'; payload: IPortfolioData }
  | { type: 'error'; error: Error };

const initialPortfolioListState: IPortfolioDataState = {
  isLoading: true,
  portfolio: [] as unknown as IPortfolioData,
  error: '',
};

const portfolioReducer = (state: IPortfolioDataState, action: PortfolioListAction) => {
  switch (action.type) {
    case 'fetching': {
      return { ...state, isLoading: true, error: '' };
    }
    case 'success': {
      return { ...state, isLoading: false, portfolio: action.payload };
    }
    case 'error': {
      return { ...state, isLoading: false, error: action.error.message };
    }
    default: {
      return state;
    }
  }
};
const PortfolioPage: NextPage = () => {
  const [{ isLoading, error, portfolio }, dispatch] = useReducer(
    portfolioReducer,
    initialPortfolioListState,
  );

  const handlePortfolioDataFetch = () => {
    dispatch({ type: 'fetching' });
    return getPortfolioAssetsByUserId()
      .then((data) => {
        dispatch({ type: 'success', payload: data as unknown as IPortfolioData });
      })
      .catch((error) => {
        dispatch({ type: 'error', error });
      });
  };

  useEffect(() => {
    void handlePortfolioDataFetch();
  }, []);

  const portfolioAssetsList = [];
  if (portfolio?.purchaseHistory && !Object.keys(portfolio).includes('statusCode')) {
    for (let i = 0; i < portfolio.purchaseHistory.length; i++) {
      if (
        Object.keys(portfolio).length > 0 &&
        Object.keys(portfolio.purchaseHistory[i]).length > 0 &&
        Object.keys(portfolio.purchaseHistory[i]).includes('asset')
      ) {
        portfolio.purchaseHistory[i].asset.fractionPriceCents =
          portfolio.purchaseHistory[i].fractionPriceCents;
        portfolio.purchaseHistory[i].asset.fractionQty = portfolio.purchaseHistory[i].fractionQty;
      }
      portfolioAssetsList.push(portfolio.purchaseHistory[i].asset);
    }
  }
  if (isLoading) {
    return <Loader />;
  }

  if (error !== '') {
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={() => {
            void handlePortfolioDataFetch();
          }}
        >
          Try again
        </button>
      </div>
    );
  }
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <PortfolioHeader />
      <PortFolioStats portfolio={portfolio} />
      <PortfolioAssetList portfolioAssetsList={portfolioAssetsList} />
    </>
  );
};

export default PortfolioPage;
