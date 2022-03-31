import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useGalleryStyles } from './Gallery.styles';

export const Gallery = ({ images }: { images: string[] }) => {
  const classes = useGalleryStyles();

  const appUrl = 'http://localhost:3000';

  const [mainImage, setMainImage] = useState(images[0]);

  const handleImage = (e: React.SyntheticEvent) => {
    const { src } = e.target as HTMLInputElement;
    const imageSrcPath = src.replace(appUrl, '');
    const ImagePostion = images.indexOf(imageSrcPath);
    setMainImage(images[ImagePostion]);
  };
  return (
    <>
      <Grid container md={12}>
        <Grid
          container
          item
          // rowSpacing={1}
          md={4}
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
        >
          {images.map((image, index) => {
            return (
              <Grid className={classes.thumbnailContainer} key={`${index}${image}`}>
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
        <Grid container item md={8} xs={12} className={classes.imageContainer}>
          <Grid item md={12}>
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
