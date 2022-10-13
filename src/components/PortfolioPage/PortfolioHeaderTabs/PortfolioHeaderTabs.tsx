import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {
  PageTitle,
  PortfolioCard,
  PortfolioContainer,
  TabContainer,
  TabHeader,
} from './PortfolioHeaderTabs.styles';

export const PortfolioHeaderTabs = ({
  activePortfolioCategory,
  tabs,
  OnClick,
}: {
  activePortfolioCategory: string;
  tabs: string[];
  OnClick: () => void;
}) => {
  useEffect(() => {
    //
  }, [activePortfolioCategory, tabs]);
  return (
    <PortfolioContainer>
      <PortfolioCard>
        <Box>
          <PageTitle>Portfolio</PageTitle>
        </Box>
        <TabContainer>
          <Box display="flex" alignItems="center" px="16px">
            {tabs.map((header, index) => (
              <Link
                key={index}
                href={{ pathname: '/account', query: { tab: header.toLocaleLowerCase() } }}
              >
                <Box
                  sx={{ padding: '24px 16px', '&: hover': { cursor: 'pointer' } }}
                  style={{
                    borderBottom:
                      activePortfolioCategory === header.toLocaleLowerCase()
                        ? '2px solid black'
                        : '2px solid transparent',
                  }}
                  onClick={() => {
                    OnClick();
                  }}
                >
                  <TabHeader
                    style={{
                      color:
                        activePortfolioCategory === header.toLocaleLowerCase()
                          ? 'black'
                          : '#6B7280',
                    }}
                  >
                    {header}
                  </TabHeader>
                </Box>
              </Link>
            ))}
          </Box>
        </TabContainer>
      </PortfolioCard>
    </PortfolioContainer>
  );
};
