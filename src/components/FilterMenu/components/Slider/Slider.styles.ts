import { makeStyles } from '@mui/styles';

export const useSliderStyles = makeStyles(
  (theme) => ({
    wrapper: {
      padding: theme.spacing(2),
      '& .MuiSlider-valueLabel': {
        textDecoration: 'none',
        lineHeight: '12px',
        backgroundColor: theme.palette.primary.main,
      },
    },
  }),
  { name: 'slider' },
);
