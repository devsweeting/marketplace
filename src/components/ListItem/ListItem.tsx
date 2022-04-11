import React from 'react';
import { Grid, Typography, Box, Divider } from '@mui/material';

import { useListItemStyles } from './ListItem.styles';
import Image from 'next/image';

export type SingleListItem = {
  category: string;
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
  const classes = useListItemStyles();
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      wrap="wrap"
    >
      {assets.map((item, index) => (
        <Box className={classes.container} key={`${item.title}${index}`}>
          <Image
            className={classes.mainImage}
            src={item.imageLink}
            alt={item.title}
            width={175}
            height={259}
          />
          <Typography variant="body2" component="p" mb={0.5}>
            {item.category}
          </Typography>
          <Typography variant="h4" component="p">
            {item.title}
          </Typography>
          <Divider />
          <Typography variant="h4" component="p" className={classes.priceCryptoValue} my={1}>
            <Image
              src={`/images/nftDetail/cryptoCurencies/${item.price.icon}.png`}
              alt={`${item.price.icon} icon`}
              width={32}
              height={32}
            />{' '}
            {item.price.cryptoValue}{' '}
            <span data-testid="dollarValueId" className={classes.priceDollarValue}>
              (${item.price.dolarValue})
            </span>
          </Typography>
        </Box>
      ))}
    </Grid>
  );
};
