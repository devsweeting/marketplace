import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useGalleryStyles } from './Gallery.styles';
import classNames from 'classnames';
import { useRouter } from 'next/router';

type Image = {
  title: string;
  description?: string;
  url: string;
  sortOrder: number;
  assetId: string;
  fileId: string;
  file: string;
};

export const Gallery = ({ images }: { images: Image[] }) => {
  const router = useRouter();
  const classes = useGalleryStyles();

  const [mainImage, setMainImage] = useState(images[0].url);

  useEffect(() => {
    setMainImage(images[0].url);
  }, [router.asPath]);

  const handleImage = (e: React.SyntheticEvent) => {
    const { src } = e.target as HTMLInputElement;
    setMainImage(src);
  };

  return (
    <>
      <Grid container className={classes.galleryContainer}>
        <Grid container item pt={0} md={4} xs={12} className={classes.thumbnailContainer}>
          {images.map((image, index) => {
            return (
              <Box
                className={classNames(classes.thumbnailWrapper, index === 0 ? classes.faded : null)}
                key={`${index}${image.title}`}
              >
                <Box className={classes.thumbnailItem}>
                  <img
                    className={classes.thumbnail}
                    src={image.url}
                    alt={image.title}
                    width={80}
                    height={114}
                    onClick={handleImage}
                  />
                </Box>
                <Typography variant="body2" component="p" className={classes.thumbnailText}>
                  {image.title}
                </Typography>
              </Box>
            );
          })}
        </Grid>
        <Grid container pt={0} item md={8} xs={12}>
          <Grid item pt={0} md={12} className={classes.imageContainer}>
            <img
              className={classes.image}
              src={mainImage}
              alt={' main asset image'}
              width={337}
              height={568}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
