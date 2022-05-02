import React, { useState, useEffect, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import classNames from 'classnames';
import { Typography, Box, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { useScrollUpWidget } from './ScrollUpWidget.styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '../Button';

export const ScrollUpWidget = ({ item }: { item: any }) => {
  const classes = useScrollUpWidget();
  const [visible, setVisible] = useState<boolean>(false);
  const { skin } = useContext(SkinContext);

  const toggleWidget = () => {
    let distanceFromTop = window.pageYOffset;

    return function () {
      const newDistanceFromTop = window.pageYOffset;

      if (window.scrollY > 1000 && distanceFromTop >= newDistanceFromTop) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      distanceFromTop = newDistanceFromTop;
    };
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleWidget());
    return window.removeEventListener('scroll', toggleWidget());
  }, []);

  return (
    <Box className={classNames(classes.wrapper, visible && classes.visible)}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Grid item xs={2}>
          <Image src={item.imageLink} alt={item.title} width={30} height={44} />
        </Grid>
        <Grid item xs={10}>
          <Box className={classes.favoriteBox}>
            <Typography variant="body2" component="p">
              {item.type}
            </Typography>
            <FavoriteIcon />
          </Box>
          <Typography variant="h3" component="p" className={classes.title}>
            {item.title}
          </Typography>
          <Divider sx={{ color: '#E5E5E5', paddingTop: '16px' }} />
        </Grid>

        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" pt={2}>
          <Grid item xs={3} direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Box>
              <Image
                src={`/images/nftDetail/cryptoCurencies/${item.price.icon}.svg`}
                alt={`${item.price.icon} icon`}
                width={20}
                height={20}
              />
              <Typography
                variant="h3"
                component="span"
                sx={{
                  fontSize: skin.listItem.cryptoValue.fontSize,
                  lineHeight: skin.listItem.cryptoValue.lineHeight,
                }}
                my={1}
                mx={1}
              >
                {item.price.cryptoValue}
              </Typography>
            </Box>
            <Typography
              variant="h3"
              component="span"
              sx={{
                fontFamily: skin.listItem.dollarValue.fontFamily,
                fontSize: skin.listItem.dollarValue.fontSize,
                fontWeight: skin.listItem.dollarValue.fontWeight,
                lineHeight: skin.listItem.dollarValue.lineHeight,
                letterSpacing: skin.listItem.dollarValue.letterSpacing,
                color: skin.listItem.dollarValue.color,
              }}
            >
              (${item.price.dolarValue})
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={9}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant={'contained'} size={'small'} className={classes.buttons}>
              BUY
            </Button>
            <Button variant={'outlined'} size={'small'} className={classes.buttons}>
              MAKE
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
