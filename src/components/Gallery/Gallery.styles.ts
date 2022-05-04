import makeStyles from '@mui/styles/makeStyles';

export const useGalleryStyles = makeStyles(
  (theme) => ({
    galleryContainer: {
      paddingTop: theme.spacing(12),
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column-reverse',
        paddingTop: theme.spacing(7),
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
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
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
        marginTop: theme.spacing(5),
      },
    },
    thumbnailWrapper: {
      textAlign: 'center',
      marginRight: theme.spacing(8),
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        margin: `0 ${theme.spacing(1)}`,
      },
    },
    thumbnailItem: {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(0.5),
      height: 64,
      width: 64,
      [theme.breakpoints.down('md')]: {
        backgroundColor: theme.palette.accent.main,
        height: 42,
        width: 42,
      },
    },
    thumbnail: {
      height: '100%',
      width: 'auto',
      maxHeight: 139,
      maxWidth: 139,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
      },
    },
    thumbnailText: {
      textAlign: 'center',
      textDecoration: 'none',
      fontWeight: 400,
      fontSize: '12px',
      fontFamily: 'Rubik',
      textTransform: 'uppercase',
      letter: '0,4px',
      [theme.breakpoints.down('md')]: {
        color: theme.palette.accent.main,
      },
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
