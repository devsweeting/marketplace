import makeStyles from '@mui/styles/makeStyles';

export const useFilterWrapperStyles = makeStyles(() => ({
  mobileFilterStyles: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  mobileHeader: {
    marginRight: 0,
    fontSize: '1.5rem',
    display: 'inline',
    whiteSpace: 'nowrap',
    margin: '0 10px',
  },
  mobileFilterHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '32px',
    margin: '10px 0px',
  },
  mobileFilterCard: {
    width: '100%',
    marginTop: '10px',
    backgroundColor: 'white',
    maxWidth: '1200px',
    margin: 'auto',
    borderRadius: '0',
  },
  desktopFilterCard: {
    width: '100%',
    marginTop: '10px',
    backgroundColor: 'white',
    borderRadius: '0',
  },
  mobileFilterWrapperWrapper: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100vw',
  },
  desktopFilterWrapperWrapper: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '100%',
  },
}));
