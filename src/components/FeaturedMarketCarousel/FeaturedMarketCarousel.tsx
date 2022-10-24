import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Loader } from '../Loader';
import { MarketCard } from './components/MarketCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { IAsset, IMarket } from '@/types/assetTypes';
import { TrendingMarketCard } from './components/TrendingMarketCard';

import { Container, Slider, TopContainer, ButtonContainer } from './FeaturedMarketCarousel.styles';

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
  const [scrollStart, setScrollStart] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [clickedCard, setClickedCard] = useState('');

  useEffect(() => {
    if (!activeBrandCard) {
      setClickedCard('');
    }
  }, [activeBrandCard]);

  const slide = (direction: number) => {
    if (scroll.current) {
      const offset = direction * (scroll.current.scrollWidth / assets.length);
      scroll.current.scrollLeft += offset;
    }
  };

  const handleScroll = () => {
    if (scroll.current) {
      setScrollStart(scroll.current.scrollLeft === 0);
      setScrollEnd(
        scroll.current.scrollWidth - scroll.current.scrollLeft <= scroll.current.offsetWidth,
      );
    }
  };

  if (!assets) return <Loader />;
  return (
    <Container item xs={12}>
      <TopContainer>
        <Typography variant="xl3" fontWeight={700}>
          {title}
        </Typography>
        <ButtonContainer>
          <IconButton
            color="primary"
            aria-label="previous"
            role="button"
            disabled={scrollStart}
            disableRipple
            onClick={() => slide(-1)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="next"
            role="button"
            disabled={scrollEnd}
            disableRipple
            onClick={() => slide(1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ButtonContainer>
      </TopContainer>
      <Box>
        <Slider ref={scroll} onScroll={handleScroll}>
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
