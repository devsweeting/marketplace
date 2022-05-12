import React, { useContext } from 'react';
import { SkinContext } from '../../../../styles/skin-context';
import { Typography, Box, Divider } from '@mui/material';
import { useCardStyles } from './Card.styles';
import Image from 'next/image';
import Link from 'next/link';
import { SingleListItem } from '../../../domain/Items';

export const Card = ({ item }: { item: SingleListItem }) => {
  const { skin } = useContext(SkinContext);

  const classes = useCardStyles();

  return (
    <Link href={`/token-detail/${item.id}`}>
      <a style={{ textDecoration: 'none', color: '#000' }}>
        <Box className={classes.container}>
          <Box
            className={classes.imageContainer}
            sx={{
              backgroundImage: `url(${skin.listItem.backgroundImage})`,
            }}
          >
            <Box sx={{ width: 155, height: 259, position: 'relative' }}>
              <Image
                className={classes.mainImage}
                src={item.media[0].url}
                alt={item.media[0].title}
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Typography variant="body2" component="p" mt={3} className={classes.itemType}>
            Overstreet comic book collection
          </Typography>
          <Typography variant="h3" component="p" mb={1} mt={1} className={classes.itemTitle}>
            {item.name}
          </Typography>
          <Divider />
        </Box>
      </a>
    </Link>
  );
};
