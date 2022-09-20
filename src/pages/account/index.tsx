import { OpenGraph } from '@/components/OpenGraph';
import { Box, Card, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next/types';
import { getPortfolioAssetsByUserId } from '@/api/endpoints/portfolio';
import React, { useState, useEffect } from 'react';
import { formatNumber } from '@/helpers/formatNumber';
import type { IAsset } from '@/types/assetTypes';

interface IPurchaseHistoryItem {
  asset: IAsset;
  assetId: string;
  createdAt: string;
  deletedAt: string | null;
  fractionPriceCents: number;
  fractionQty: number;
  id: string;
  isDelete: boolean;
  purchaseTotal: number;
  sellOrderId: string;
  updatedAt: string;
  userId: string;
}
interface IPortfilioData {
  totalValueInCents: number;
  totalUnits: number;
  purchaseHistory: IPurchaseHistoryItem[];
  sellOrderHistory: [];
}

const PortfolioPage: NextPage = () => {
  const [portfolioData, setPortfolioData] = useState<IPortfilioData | undefined>();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);

    getPortfolioAssetsByUserId()
      .then((data) => setPortfolioData(data as unknown as IPortfilioData))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);
  const assetsList = [];
  if (portfolioData) {
    if (Object.keys(portfolioData).length > 0) {
      for (let i = 0; i < portfolioData.purchaseHistory.length; i++) {
        assetsList.push(portfolioData.purchaseHistory[i].asset);
      }
    }
  }
  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <OpenGraph title={'List view'} description={'List view page description'} />
      <Grid
        sx={{
          marginTop: 10,
          backgroundColor: '#fff',
          width: '100%',

          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        container
      >
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h2"
              style={{
                margin: 0,
                padding: '24px',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              Portfolio
            </Typography>
          </Box>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginRight: '20px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <Box sx={{ padding: '24px 16px', borderBottom: '2px solid black' }}>
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: '#6B7280',
                  }}
                >
                  Overview
                </Typography>
              </Box>
              <Box sx={{ padding: '24px 16px', borderBottom: '2px solid black' }}>
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: '#6B7280',
                  }}
                >
                  Watchlist
                </Typography>
              </Box>
              <Box sx={{ padding: '24px 16px', borderBottom: '2px solid black' }}>
                <Typography
                  component="h2"
                  variant="h2"
                  style={{
                    margin: 0,
                    padding: '0',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '32px',
                    color: '#6B7280',
                  }}
                >
                  Transactions
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Card>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          width: '100%',
          padding: '24px',
          margin: '56px auto 56px auto',
        }}
      >
        <Box style={{ marginRight: '40px' }}>
          <Typography variant="h3" component="h3">
            Porfolio Value
          </Typography>
          <Typography
            variant="h2"
            component="p"
            style={{
              fontSize: '3.75rem',
              fontWeight: '600',
              lineHeight: '60px',
              fontStyle: 'normal',
            }}
          >
            {portfolioData && Object.keys(portfolioData).length && (
              <>{`$${
                portfolioData.totalValueInCents
                  ? formatNumber(portfolioData.totalValueInCents / 100)
                  : 0
              }`}</>
            )}
          </Typography>
        </Box>
        <Box style={{ marginRight: '40px', marginLeft: '40px' }}>
          <Typography variant="h3" component="h3">
            Cash Balance
          </Typography>
          <Typography
            variant="h2"
            component="p"
            style={{
              fontSize: '3.75rem',
              fontWeight: '600',
              lineHeight: '60px',
              fontStyle: 'normal',
            }}
          >
            $1200
          </Typography>
        </Box>
        <Box style={{ marginRight: '40px', marginLeft: '40px' }}>
          <Typography variant="h3" component="h3">
            Total Units
          </Typography>
          <Typography
            variant="h2"
            component="p"
            style={{
              fontSize: '3.75rem',
              fontWeight: '600',
              lineHeight: '60px',
              fontStyle: 'normal',
            }}
          >
            {portfolioData && Object.keys(portfolioData).length && (
              <>{`${portfolioData.totalUnits}`}</>
            )}
          </Typography>
        </Box>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="stretch"></Grid>
    </>
  );
};

export default PortfolioPage;
