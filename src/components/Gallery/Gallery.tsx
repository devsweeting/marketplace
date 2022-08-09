import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useGalleryStyles } from './Gallery.styles';
import Image from 'next/image';

export type Image = {
  url: string;
  title: string;
  description?: string;
  sortOrder: number;
  assetId: string;
  fileId: string;
  absoluteUrl: string;
};

export const Gallery = ({ images }: { images: Image[] }) => {
  const router = useRouter();
  const classes = useGalleryStyles();

  const [mainImage, setMainImage] = useState(
    images[0].absoluteUrl ? images[0].absoluteUrl : images[0].url,
  );

  useEffect(() => {
    setMainImage(images[0].absoluteUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                className={classNames(
                  classes.thumbnailWrapper,
                  image.absoluteUrl === mainImage ? classes.faded : null,
                )}
                key={`${index}${image.title}`}
              >
                <Box className={classes.thumbnailItem}>
                  {image.absoluteUrl && (
                    <Image
                      placeholder="blur"
                      blurDataURL={`/_next/image?url=${image.absoluteUrl}&w=16&q=1`}
                      className={classes.thumbnail}
                      src={image.absoluteUrl}
                      alt={image.title}
                      width={80}
                      height={114}
                      onClick={handleImage}
                    />
                  )}
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
            <Image
              placeholder="blur"
              blurDataURL={`/_next/image?url=${mainImage}&w=16&q=1`}
              id="main-gallery-image"
              className={classes.image}
              src={mainImage}
              alt={'main asset image'}
              width={337}
              height={568}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
