import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useSliderStyles = makeStyles(
  (theme) => ({
    wrapper: {
      padding: theme.spacing(2),
      '& .MuiSlider-valueLabel': {
        textDecoration: 'none',
        lineHeight: '12px',
        backgroundColor: theme.palette.primary.main,
      },
      '& .Mui-disabled': {
        color: lighten(theme.palette.primary.main, 0.7),
        '& .MuiSlider-valueLabel': {
          backgroundColor: lighten(theme.palette.primary.main, 0.7),
        },
      },
    },
    switch: {
      '& .MuiSwitch-switchBase': {
        color: theme.palette.primary.main,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: theme.palette.secondary.main,
      },
    },
  }),
  { name: 'slider' },
);
