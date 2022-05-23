import Grid from '@mui/material/Grid';
import { useFooterStyles } from './Footer.styles';
import { Typography } from '@mui/material';

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <Grid container item xs={12} flexDirection={'row'} justifyContent={'center'} id="footer">
      <Grid item className={classes.container}>
        <Typography variant="body1" component="p" className={classes.text}>
          © 2022 Third Venture, Inc. - All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};
