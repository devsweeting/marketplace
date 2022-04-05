import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useGalleryStyles } from './Gallery.styles';

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
        <Grid container item md={3} xs={12} className={classes.thumbnailContainer}>
          {images.map((image, index) => {
            return (
              <Grid className={classes.thumbnailItem} key={`${index}${image}`}>
                <img
                  className={classes.thumbnail}
                  src={image}
                  alt="product thumbnail"
                  width={80}
                  height={114}
                  onClick={handleImage}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container item md={9} xs={12}>
          <Grid item md={12} className={classes.imageContainer}>
            <img
              className={classes.image}
              src={mainImage}
              alt="Picture of the product"
              width={233}
              height={345}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
