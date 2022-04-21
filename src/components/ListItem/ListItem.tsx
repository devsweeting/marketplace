import React, { useContext } from 'react';
import { SkinContext } from '../../../styles/skin-context';
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
export type ListItems = SingleListItem[];

export const ListItem: React.FC<{ listItemData: ListItems }> = ({ listItemData }) => {
  const { skin } = useContext(SkinContext);

  const classes = useListItemStyles();
  return (
    <Grid container item xs={12} className={classes.wrapper}>
      {listItemData.map((item, index) => (
        <Box className={classes.container} key={`${item.title}${index}`}>
          <Box
            className={classes.imageContainer}
            sx={{
              backgroundImage: `url(${skin.listItem.backgroundImage})`,
            }}
          >
            <Image
              className={classes.mainImage}
              src={item.imageLink}
              alt={item.title}
              width={280}
              height={280}
            />
          </Box>
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
                lineHeight: skin.listItem.dollarValue.lineHeight,
                letterSpacing: skin.listItem.dollarValue.letterSpacing,
                color: skin.listItem.dollarValue.color,
              }}
            >
              (${item.price.dolarValue})
            </Typography>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};
