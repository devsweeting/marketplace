import { Box, Button } from '@mui/material';
import type { ICardGallery } from './ICardGallery';
import Image from 'next/image';
import type { IMedia } from '@/types/assetTypes';
import { useEffect, useState } from 'react';

export const CardGallery = ({ images }: ICardGallery) => {
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
      <Box style={{ width: 'auto', height: 500, position: 'relative' }}>
        <Image
          src={currentImage.absoluteUrl}
          layout={'fill'}
          objectFit={'contain'}
          alt={currentImage.title}
          style={{ textAlign: 'center', lineHeight: '325px' }}
        ></Image>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {images.map((image) => {
          return (
            <Button
              onClick={() => handleImageSwitch(image)}
              key={`${image.assetId}-${Math.random()}`}
              sx={{ cursor: 'pointer', padding: '10px' }}
            >
              <Image
                src={image.absoluteUrl}
                width={55}
                height={85}
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
    </Box>
  );
};
