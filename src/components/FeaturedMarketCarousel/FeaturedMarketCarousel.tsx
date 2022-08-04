import React, { useState, useRef, useEffect } from 'react';
import { useWindowDimensions } from '@/helpers/hooks/useWindowDimensions';
import { useFeaturedMarketCarouselStyles } from './FeaturedMarketCarousel.styles';
import { Box, Grid, Typography } from '@mui/material';
import { Loader } from '../Loader';
import { MarketCard } from './components/MarketCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { IAsset } from '@/types/assetTypes';
import { latestDropAssets } from '@/api/endpoints/list';

export const FeaturedMarketCarousel = ({
  handleDrawer,
}: {
  handleDrawer: (asset: IAsset) => void;
}) => {
  const classes = useFeaturedMarketCarouselStyles();
  const scroll = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [assets, setAssets] = useState<IAsset[]>([]);

  const loadAssets = async (page = 1) => {
    const { items }: { items: IAsset[] } = await latestDropAssets({
      page,
    });
    setAssets((prev) => (page === 1 ? items : [...prev, ...items]));
  };

  useEffect(() => {
    loadAssets(1);
  }, []);

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
        {'Latest Drop'}
      </Typography>
      <Box
        style={{
          display: 'flex',
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
          boxShadow: 'inset 0 0 10px #000000',
        }}
      >
        {scrollX !== 0 && (
          <button
            role="button"
            className={`${classes.button} ${classes.prev} prev`}
            onClick={() => {
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
        )}
        {!scrollEnd && (
          <button
            role="button"
            className={`${classes.button} ${classes.next} next`}
            onClick={() => {
              switch (true) {
                case width <= 599.95:
                  return slide(300);
                case width < 899.95 && width >= 600:
                  return slide(350);
                default:
                  return slide(300);
              }
            }}
          >
            <>
              <ArrowForwardIosIcon />
            </>
          </button>
        )}
        <Box className={`${classes.slider} ${classes.snap}`} ref={scroll} onScroll={scrollCheck}>
          {assets &&
            assets.map((card: any, index: number) => (
              <MarketCard
                handleDrawer={() => handleDrawer(card)}
                asset={card}
                key={index}
                tabIndex={index}
              />
            ))}
        </Box>
      </Box>
      {/* <Typography variant="h3" component="h2" className={classes.viewMore}>
        {'View All >>>'}
      </Typography> */}
    </Grid>
  );
};