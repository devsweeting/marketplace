import React, { useState, useEffect, useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
import classNames from 'classnames';
import { Typography, Box, Divider } from '@mui/material';
import Image from 'next/image';
import { useScrollUpWidget } from './ScrollUpWidget.styles';

export const ScrollUpWidget = ({ item }) => {
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
      <Box className={classes.container}>
        <Image
          className={classes.mainImage}
          src={item.imageLink}
          alt={item.title}
          width={30}
          height={44}
        />
        <Typography variant="body2" component="p" mt={3} className={classes.itemType}>
          {item.type}
        </Typography>
        <Typography variant="h3" component="p" mb={1} mt={1} className={classes.itemTitle}>
          {item.title}
        </Typography>
        <Divider />
        <Box className={classes.priceContainer}>
          <Image
            src={`/images/nftDetail/cryptoCurencies/${item.price.icon}.svg`}
            alt={`${item.price.icon} icon`}
            width={20}
            height={32}
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
        </Box>
      </Box>
    </Box>
  );
};
