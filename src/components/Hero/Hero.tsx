import Grid from '@mui/material/Grid';
import Image from 'next/image';
import theme from '../../../styles/themePWCC';

export interface HeroProps {
  imgSrc?: string;
  imgFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  imgHeight?: number;
  imgAlt: string;
}

export const Hero: React.FC<HeroProps> = ({ imgSrc, imgFit, imgHeight, imgAlt }) => {
  return (
    <Grid
      component="section"
      container
      sx={{
        position: `relative`,
        height: '100vh',
        ...(imgHeight && {
          height: `${imgHeight}px`,
        }),
        width: `100vw`,
        background: theme.palette.customGray.main,
        overflow: `hidden`,
        zIndex: -100,
        // mb: 15,
        margin: '0',
      }}
    >
      {imgSrc && <Image src={imgSrc} alt={imgAlt} layout="fill" objectFit={imgFit} />}
    </Grid>
  );
};
