import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useGalleryStyles = makeStyles(
  () => ({
    galleryContainer: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column-reverse',
      },
    },
    imageContainer: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(2),
      height: 400,
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      boxSizing: 'content-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    image: {
      height: '100%',
      width: 'auto',
    },
    thumbnailContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        marginTop: '20px',
      },
    },
    thumbnailItem: {
      backgroundColor: theme.palette.primary.main,
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      maxHeight: 139,
      maxWidth: 139,
      height: '100%',
      width: '100%',
      marginBottom: theme.spacing(1),
      marginRight: '10px',
    },
    thumbnail: {
      height: '100%',
      width: 'auto',
      maxHeight: 139,
      maxWidth: 139,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      cursor: 'pointer',
    },
  }),
  { name: 'gallery' },
);
