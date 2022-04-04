import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useGalleryStyles = makeStyles(
  () => ({
    imageContainer: {
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      height: 400,
      width: 400,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      boxSizing: 'content-box',
    },
    thumbnailContainer: {
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      height: 139,
      width: 139,
      marginBottom: theme.spacing(1),
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
