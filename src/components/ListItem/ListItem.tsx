import React from 'react';
import { Grid, Typography, Box, Divider } from '@mui/material';

import { useListItemStyles } from './ListItem.styles';
import Image from 'next/image';

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
export interface ListItem {
  assets: SingleListItem[];
}

export const ListItem: React.FC<{ listItemData: ListItem }> = ({ listItemData }) => {
  const { assets } = listItemData;

  // assets.sort((a, b) => a.price.cryptoValue.localeCompare(b.price.cryptoValue));
  // dynamic sort

  const classes = useListItemStyles();
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      wrap="wrap"
    >
      {assets.map((item, index) => (
        <Box className={classes.container} key={`${item.title}${index}`}>
          <Box className={classes.imageContainer}>
            <Image
              className={classes.mainImage}
              src={item.imageLink}
              alt={item.title}
              width={280}
              height={280}
            />
          </Box>
          <Typography variant="body2" component="p" mt={3}>
            {item.type}
          </Typography>
          <Typography variant="h4" component="p" mb={1} mt={1} sx={{ minHeight: 65 }}>
            {item.title}
          </Typography>
          <Divider />
          <Box className={classes.priceContainer}>
            <Image
              src={`/images/nftDetail/cryptoCurencies/${item.price.icon}.png`}
              alt={`${item.price.icon} icon`}
              width={20}
              height={32}
            />
            <Typography variant="h4" component="span" className={classes.priceCryptoValue} my={1}>
              {item.price.cryptoValue}
            </Typography>
            <Typography variant="h4" component="span" className={classes.priceDollarValue}>
              (${item.price.dolarValue})
            </Typography>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};
