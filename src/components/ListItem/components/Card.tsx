import React, { useContext } from 'react';
import Image from 'next/image';
import { Typography, Box, Divider } from '@mui/material';
import { SkinContext } from '@/styles/skin-context';
import { useCardStyles } from './Card.styles';
import { IAsset } from 'src/types';
import Link from "next/link";

export type SingleListItem = {
  type: string;
  title: string;
  imageLink: string;
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
            src={item.media[0].file}
            alt={item.media[0].title}
            width={280}
            height={280}
          />
        }
      </Box>
      <Typography variant="body2" component="p" mt={3} className={classes.itemType}>
        <Link href={`/item/${item.id}`}>{item.name}</Link>
      </Typography>
      <Typography variant="h3" component="p" mb={1} mt={1} className={classes.itemTitle}>
        {item.description}
      </Typography>
      <Divider />
    </Box>
  );
};
