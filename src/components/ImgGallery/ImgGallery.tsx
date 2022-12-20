import type { IMedia } from '@/types';
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@mui/icons-material';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Container, ControlButton, Carousel, ImgWrapper, Img, ImgCount } from './ImgGallery.styles';

interface ImgGalleryProps {
  images: IMedia[];
}

export function ImgGallery({ images }: ImgGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getDistanceFromActive = (index: number): number => Math.abs(index - activeIndex);

  const getTranslateOffset = (index: number): string => {
    const distance = index - activeIndex;

    if (distance > 0) return '50%';
    if (distance < 0) return '-50%';

    return '0';
  };

  const getImgStyles = (index: number): CSSProperties => {
    return {
      zIndex: images.length - getDistanceFromActive(index),
      opacity: index === activeIndex ? '1' : '0',
      transform: `translateX(${getTranslateOffset(index)})`,
      scale: index === activeIndex ? '1' : '0.8',
      visibility: getDistanceFromActive(index) > 0 ? 'hidden' : 'visible',
    };
  };

  const incrementIndex = (increment: number) =>
    setActiveIndex((prev) => {
      const newIndex = prev + increment;

      if (newIndex < 0) return images.length - 1;

      if (newIndex >= images.length) return 0;

      return newIndex;
    });

  return (
    <Container>
      <ControlButton
        onClick={() => incrementIndex(-1)}
        sx={{ justifyContent: 'right' }}
        $transform="-0.5rem"
      >
        <KeyboardArrowLeftRounded fontSize="large" />
      </ControlButton>
      <Carousel>
        {images &&
          images.map((img, index) => (
            <ImgWrapper key={img.id} style={{ ...getImgStyles(index) }}>
              <Img
                priority
                placeholder="blur"
                blurDataURL={`/_next/image?url=${img.absoluteUrl}&w=16&q=1`}
                src={img.absoluteUrl}
                fill
                alt={img.title}
              />
            </ImgWrapper>
          ))}
        <ImgCount>
          {activeIndex + 1} | {images.length}
        </ImgCount>
      </Carousel>
      <ControlButton
        onClick={() => incrementIndex(1)}
        sx={{ justifyContent: 'left' }}
        $transform="0.5rem"
      >
        <KeyboardArrowRightRounded fontSize="large" />
      </ControlButton>
    </Container>
  );
}
