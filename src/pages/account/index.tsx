import { OpenGraph } from '@/components/OpenGraph';
import { Loader } from '@/components/Loader';
import type { NextPage } from 'next/types';
import { getPortfolioAssetsByUserId } from '@/api/endpoints/portfolio';
import React, { useEffect, useReducer, useState } from 'react';
import type { IAsset } from '@/types/assetTypes';
import { PortfolioHeader } from '@/components/PortfolioPage/PortfolioHeader';
import { PortFolioStats } from '@/components/PortfolioPage/PortfolioStats/PortFolioStats';
import { PortfolioAssetList } from '@/components/PortfolioPage/PortfolioAssetList';
import { Box, Button, Card, Grid, TextField, Typography, useTheme } from '@mui/material';

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
  const [loginInputValue, setLoginInputValue] = useState('');
  const theme = useTheme();

  const inputProps = {
    root: {
      '& .MuiFormLabel-root.Mui-error': {
        color: '#b04995',
      },
      '& input': {
        color: 'black',
        fontSize: 20,
        fontWeight: 600,
        marginLeft: 20,
        [theme.breakpoints.down('sm')]: {
          fontSize: 18,
        },
      },
      '& .MuiFormLabel-filled + .MuiInputBase-root input': {
        padding: '35px 12px 14px',
        [theme.breakpoints.down('sm')]: {
          padding: '15px 6px 7px',
        },
      },
      '& .Mui-focused input': {
        padding: '35px 12px 14px',
        [theme.breakpoints.down('sm')]: {
          padding: '15px 6px 7px',
        },
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: '#b04995',
        fontFamily: 'Muli',
        fontSize: 12,
      },
    },
  };
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
      <Grid>
        <OpenGraph title={'List view'} description={'List view page description'} />
        <PortfolioHeader />
        <Box>
          <PortFolioStats portfolio={portfolio} />
          <PortfolioAssetList portfolioAssetsList={portfolioAssetsList} />
        </Box>
      </Grid>
      {Object.keys(portfolio).includes('statusCode') && (
        <Box
          sx={{
            position: 'fixed',
            zIndex: 1,
            top: '0',
            bottom: '0',
            right: '0',
            left: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card sx={{ padding: '30px' }}>
            <Box sx={{ margin: '20px', width: '100%' }}>
              <Typography variant="h2" component="h2">
                Login To Continue
              </Typography>
            </Box>
            <Box
              sx={{
                margin: '40px 20px',
                display: 'flex',
              }}
            >
              <TextField
                InputProps={{ inputProps, disableUnderline: true }}
                id="outlined-basic"
                variant="standard"
                placeholder="Email"
                value={loginInputValue}
                onChange={(newValue) => setLoginInputValue(newValue.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    console.log((e.target as unknown as HTMLTextAreaElement).value);
                  }
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  borderRadius: '50px',
                  width: '100%',
                  height: '75px',
                  fontSize: '1.5rem',
                  border: '2px solid grey',
                  backgroundColor: 'white',
                  '& input': {
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 600,
                    marginLeft: '20px',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: 18,
                    },
                  },
                  [theme.breakpoints.down('sm')]: {
                    margin: '10px 0px',
                    width: '95%',
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                marginRight: '40px',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '50px',
                  width: '175px',
                  height: '75px',
                  margin: '0 20px',
                  fontSize: '1.3rem',
                  border: '3px solid black',
                  '&:hover': {
                    color: 'black',
                  },
                  [theme.breakpoints.down('sm')]: {
                    margin: '10px auto',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default PortfolioPage;
