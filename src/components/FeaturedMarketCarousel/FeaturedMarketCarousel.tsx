import React, { useState, useRef } from 'react';
import { useWindowDimensions } from '@/helpers/hooks/useWindowDimensions';
import { useFeaturedMarketCarouselStyles } from './FeaturedMarketCarousel.styles';
import { Box, Grid, Typography } from '@mui/material';
import { Loader } from '../Loader';
import { MarketCard } from './components/MarketCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { IAsset, IMarket } from '@/types/assetTypes';
import { TrendingMarketCard } from './components/TrendingMarketCard';

export const FeaturedMarketCarousel = ({
  assets,
  title,
  handleDrawer,
}: {
  assets: IAsset[] | IMarket[];
  title: string;
  handleDrawer?: (asset: IAsset) => void;
}) => {
  const classes = useFeaturedMarketCarouselStyles();
  const scroll = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

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
    <Grid item xs={12} className={classes.wrapper}>
      <Typography variant="h2" component="h2" className={classes.title}>
        {title}
      </Typography>
      <Box
        style={{
          display: 'flex',
          position: 'relative',
        }}
      >
        {
          <button
            aria-label="previous"
            role="button"
            className={`${classes.button} ${classes.prev}  ${
              scrollX < 1 ? classes.disabledButton : ''
            }`}
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
            <>
              <ArrowBackIosNewIcon />
            </>
          </button>
        }
        {
          <button
            aria-label="next"
            role="button"
            className={`${classes.button} ${classes.next} ${
              scrollEnd ? classes.disabledButton : ''
            }`}
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
            <>
              <ArrowForwardIosIcon />
            </>
          </button>
        }
        <Box className={`${classes.slider} ${classes.snap}`} ref={scroll} onScroll={scrollCheck}>
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
                  handleDrawer={() => {
                    return undefined;
                  }}
                  brand={card}
                  key={index}
                  tabIndex={index}
                />
              ))}
        </Box>
      </Box>
    </Grid>
  );
};
