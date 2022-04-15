import Grid from '@mui/material/Grid';
import { useFooterStyles } from './Footer.styles';
import { Typography } from '@mui/material';

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <Grid container xs={12} className={classes.container}>
      <Grid item>
        <Typography variant="body2" component="p">
          © 2022 Third Venture, Inc. - All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};
