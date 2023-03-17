import { Box, Button } from '@mui/material';
import type { IAssetGallery } from './IAssetGallery';
import Image from 'next/image';
import type { IMedia } from '@/types';
import { useEffect, useState } from 'react';
import { NO_IMAGE_AVAILABLE } from '@/helpers/noImageFound';

export const AssetGallery = ({ images }: IAssetGallery) => {
  const [currentImage, setCurrentImage] = useState<IMedia>(images[0]);
  const [imageId, setImageId] = useState(images[0].assetId);

  const handleImageSwitch = (image: IMedia) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    if (imageId !== images[0].assetId) {
      setCurrentImage(images[0]);
    }
    setImageId(images[0].assetId);
  }, [images, imageId]);

  return (
    <Box>
      <Box style={{ width: 'auto', height: 280, position: 'relative' }}>
        <Image
          placeholder="blur"
          blurDataURL={`/_next/image?url=${currentImage.absoluteUrl}&w=16&q=1`}
          priority={true}
          src={currentImage.absoluteUrl ? currentImage.absoluteUrl : NO_IMAGE_AVAILABLE}
          fill
          alt={currentImage.title}
          style={{ textAlign: 'center', lineHeight: '325px', objectFit: 'contain' }}
        />
      </Box>
      {images.length > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {images.map((image) => {
            return (
              <Button
                onClick={() => handleImageSwitch(image)}
                key={`${image.assetId}-${Math.random()}`}
                sx={{ cursor: 'pointer', padding: '10px' }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={`/_next/image?url=${image.absoluteUrl}&w=16&q=1`}
                  priority={true}
                  src={image.absoluteUrl ? image.absoluteUrl : NO_IMAGE_AVAILABLE}
                  width={45}
                  height={70}
                  alt={image.title}
                  style={{
                    textAlign: 'center',
                    lineHeight: '325px',
                    filter: image.absoluteUrl === currentImage.absoluteUrl ? '' : 'opacity(55%)',
                  }}
                ></Image>
              </Button>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
