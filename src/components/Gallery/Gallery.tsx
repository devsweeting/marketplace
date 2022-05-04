import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useGalleryStyles } from './Gallery.styles';
import classNames from 'classnames';

export const Gallery = ({ images }: { images: string[] }) => {
  const classes = useGalleryStyles();

  const appUrl = process.env.NEXT_PUBLIC_FRONTEND_URL as string;

  const [mainImage, setMainImage] = useState(images[0]);

  const handleImage = (e: React.SyntheticEvent) => {
    const { src } = e.target as HTMLInputElement;
    const imageSrcPath = src.replace(appUrl, '');
    const ImagePostion = images.indexOf(imageSrcPath);
    setMainImage(images[ImagePostion]);
  };

  return (
    <>
      <Grid container className={classes.galleryContainer}>
        <Grid container item pt={0} md={4} xs={12} className={classes.thumbnailContainer}>
          {images.map((image, index) => {
            return (
              <Box
                className={classNames(classes.thumbnailWrapper, index === 0 ? classes.faded : null)}
                key={`${index}${image}`}
              >
                <Box className={classes.thumbnailItem}>
                  <img
                    className={classes.thumbnail}
                    src={image}
                    alt="product thumbnail"
                    width={80}
                    height={114}
                    onClick={handleImage}
                  />
                </Box>
                <Typography variant="body2" component="p" className={classes.thumbnailText}>
                  Front
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
              alt="Picture of the product"
              width={337}
              height={568}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
