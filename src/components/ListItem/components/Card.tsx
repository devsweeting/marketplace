import React, { useContext } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { SkinContext } from '@/styles/skin-context';
import { useCardStyles } from './Card.styles';
import Link from 'next/link';
import type { IAsset } from 'src/types';
import Image from 'next/image';

interface CardProps {
  item: IAsset;
}

export const Card = ({ item }: CardProps) => {
  const { skin } = useContext(SkinContext);

  const classes = useCardStyles();

  return (
    <Link href={`/item/${item.slug}`}>
      <a style={{ textDecoration: 'none', color: '#000' }}>
        <Box className={classes.container}>
          <Box
            className={classes.imageContainer}
            sx={{
              backgroundImage: `url(${skin.listItem.backgroundImage})`,
            }}
          >
            <Box className={classes.imageInnerContainer}>
              {item?.media && item?.media.length > 0 && (
                <Image
                  className={classes.mainImage}
                  src={item.media[0].absoluteUrl}
                  alt={item.media[0].title}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </Box>
          </Box>

          <Typography variant="body2" component="p" mt={3} className={classes.itemType}>
            {item.name}
          </Typography>
          <Typography variant="h3" component="p" mb={1} mt={1} className={classes.itemTitle}>
            {item.description}
          </Typography>
          <Divider />
        </Box>
      </a>
    </Link>
  );
};
