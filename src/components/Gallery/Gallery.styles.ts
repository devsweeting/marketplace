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
      '&:hover': {
        // backgroundColor: theme.palette.secondary.main,
      },
    },
    thumbnailContainer: {
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      height: 112,
      width: 112,
      margin: theme.spacing(1),
      marginTop: theme.spacing(0),
      '&:hover': {
        // backgroundColor: theme.palette.secondary.main,
      },
    },
    thumbnail: {
      height: '100%',
      width: 'auto',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      cursor: 'pointer',
    },
  }),
  { name: 'gallery' },
);
