import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';
export const useTradePanelStyles = makeStyles(
  (theme) => ({
    Drawer: {
      '& .MuiDrawer-paper': {
        width: '500px',
        marginTop: '80px',
        padding: '10px 30px 130px 30px',
        backgroundColor: '#f9fafb',
        [theme.breakpoints.down('md')]: {
          width: '90%',
        },
      },
    },
    fullWidthDivider: {
      margin: '0 -30px',
    },
    card_header: {
      display: 'flex',
      alignItems: 'center',
    },
    card_header_text: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '123%',
      letter: '0.25px',
      color: lighten(theme.palette.primary.main, 0.45),
    },
    details_section: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    market_info: {
      display: 'flex',
    },
    available_instances: {
      fontWeight: 550,
      fontSize: '16px',
      marginTop: '20px',
    },
    card_valuation: {
      color: lighten(theme.palette.primary.main, 0.45),
      fontSize: '12px',
      fontWeight: 550,
    },
    title: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '123%',
      letter: '0.25px',
      color: theme.palette.primary.main,
    },
    assetClaimedWrapper: {
      marginLeft: 'auto',
      marginTop: '10px',
    },
    fullWidthButton: {
      width: '100%',
      marginTop: '10px',
      justifyContent: 'center',
    },
    detailsInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
    },
    progressBar: {
      height: '8px',
      borderRadius: '10px',
    },
    galleryWrapper: {
      marginTop: '40px',
    },
    slider_styles: {
      '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow:
            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        },
      },
    },
  }),
  { name: 'selectInput' },
);
