import React, { useContext } from 'react';
import Image from 'next/image';
import { Typography, Box, Divider } from '@mui/material';
import { SkinContext } from '@/styles/skin-context';
import { useCardStyles } from './Card.styles';
import { IAsset } from 'src/types';

export type SingleListItem = {
  type: string;
  title: string;
  imageLink: string;
  price: {
    icon: string;
    cryptoValue: string;
    dolarValue: string;
  };
};
interface CardProps {
  item: IAsset;
}

export const Card = ({ item }: CardProps) => {
  const { skin } = useContext(SkinContext);

  const classes = useCardStyles();

  return (
    <Box className={classes.container}>
      <Box
        className={classes.imageContainer}
        sx={{
          backgroundImage: `url(${skin.listItem.backgroundImage})`,
        }}
      >
        {item?.media && item?.media.length > 0 &&
          <Image
            className={classes.mainImage}
            src={item.media[0].url}
            alt={item.media[0].title}
            width={280}
            height={280}
          />
        }
      </Box>
      <Typography variant="body2" component="p" mt={3} className={classes.itemType}>
        {item.name}
      </Typography>
      <Typography variant="h3" component="p" mb={1} mt={1} className={classes.itemTitle}>
        {item.name}
      </Typography>
      <Divider />
      <Box className={classes.priceContainer}>
        {/* <Image
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
        </Typography> */}
      </Box>
    </Box>
  );
};
