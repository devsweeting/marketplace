import { makeStyles } from '@mui/styles';

export const useGalleryStyles = makeStyles(
  (theme) => ({
    galleryContainer: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column-reverse',
      },
    },
    imageContainer: {
      borderRadius: theme.spacing(2),
      height: 400,
      width: '100%',
      paddingBottom: theme.spacing(0),
      boxSizing: 'content-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    image: {
      height: '100%',
      width: 'auto',
    },

    thumbnailContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        marginTop: '20px',
      },
    },
    thumbnailWrapper: {
      textAlign: 'center',
      marginRight: theme.spacing(8),
      marginTop: theme.spacing(2),
    },
    thumbnailItem: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(0.5),
      height: 64,
      width: 64,
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
    carousel: {
      height: '100%',
      minHeight: 40,
    },
    faded: {
      opacity: 0.3,
    },
  }),
  { name: 'gallery' },
);
