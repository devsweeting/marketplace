import React, { useState, useRef, useEffect } from 'react';
import { useWindowDimensions } from '@/helpers/hooks/useWindowDimensions';
import { Box } from '@mui/material';
import { Loader } from '../Loader';
import { MarketCard } from './components/MarketCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { IAsset, IMarket } from '@/types/assetTypes';
import { TrendingMarketCard } from './components/TrendingMarketCard';

import { Container, Title, Slider, Button } from './FeaturedMarketCarousel.styles';

export const FeaturedMarketCarousel = ({
  assets,
  title,
  handleDrawer,
  handleApplyBrandFilter,
  activeBrandCard,
}: {
  assets: IAsset[] | IMarket[];
  title: string;
  handleDrawer?: (asset: IAsset) => void;
  handleApplyBrandFilter?: (string: string, brand: IMarket) => void;
  activeBrandCard?: string;
}) => {
  const scroll = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [clickedCard, setClickedCard] = useState('');
  useEffect(() => {
    if (!activeBrandCard) {
      setClickedCard('');
    }
  }, [activeBrandCard]);

  const slide = (shift: number) => {
    if (scroll.current) {
      scroll.current.scrollLeft += shift;
      setScrollX(scrollX + shift);

      if (
        Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
        scroll.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  const scrollCheck = () => {
    if (scroll.current) {
      setScrollX(scroll.current.scrollLeft);
      if (
        Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
        scroll.current.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  if (!assets || !width) return <Loader />;
  return (
    <Container item xs={12}>
      <Title variant="xl3">{title}</Title>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
        }}
      >
        <Button
          aria-label="previous"
          role="button"
          sx={{ right: '70px' }}
          disabled={scrollX < 1}
          disableRipple
          onClick={() => {
            if (scrollX === 0) {
              return;
            }
            switch (true) {
              case width <= 599.95:
                return slide(-300);
              case width < 899.95 && width >= 600:
                return slide(-350);
              default:
                return slide(-300);
            }
          }}
        >
          <ArrowBackIosNewIcon />
        </Button>
        <Button
          aria-label="next"
          role="button"
          sx={{ right: '10px' }}
          disabled={scrollEnd}
          disableRipple
          onClick={() => {
            if (scrollEnd) {
              return;
            }
            switch (true) {
              case width <= 599.95:
                return slide(300);
              case width < 899.95 && width >= 600:
                return slide(360);
              default:
                return slide(300);
            }
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
        <Slider ref={scroll} onScroll={scrollCheck}>
          {assets && handleDrawer
            ? assets.map((card: any, index: number) => (
                <MarketCard
                  handleDrawer={() => handleDrawer(card)}
                  asset={card}
                  key={index}
                  tabIndex={index}
                />
              ))
            : assets.map((card: any, index: number) => (
                <TrendingMarketCard
                  onClick={() => {
                    setClickedCard(card.brand);

                    handleApplyBrandFilter && handleApplyBrandFilter(card.filter, card);
                  }}
                  activeCard={activeBrandCard ? clickedCard : ''}
                  brand={card}
                  key={index}
                  tabIndex={index}
                />
              ))}
        </Slider>
      </Box>
    </Container>
  );
};
