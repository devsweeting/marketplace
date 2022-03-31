import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useGalleryStyles = makeStyles(
  () => ({
    imageContainer: {
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      height: '100%',
      width: '100%',
      maxHeight: 400,
      maxWidth: 400,
      padding: theme.spacing(2),
      boxSizing: 'content-box',
    },
    thumbnailContainer: {
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      height: 128,
      width: 128,
      margin: theme.spacing(1),
      marginTop: theme.spacing(0),
    },
    thumbnail: {
      height: '100%',
      width: 'auto',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      cursor: 'pointer',
    },
    image: {
      height: '100%',
      width: 'auto',
    },
  }),
  { name: 'gallery' },
);
