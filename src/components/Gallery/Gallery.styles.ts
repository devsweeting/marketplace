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
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      boxSizing: 'content-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
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
    thumbnailItem: {
      textAlign: 'center',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(1),
      maxHeight: 67,
      maxWidth: 85,
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
    carousel: {
      height: '100%',
      minHeight: 40,
    },
  }),
  { name: 'gallery' },
);
