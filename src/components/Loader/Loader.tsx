import { CircularProgress, Fade, Grid } from '@mui/material';
import React from 'react';

const Loadable: React.FC<{
  transitionDelay?: boolean;
}> = ({ transitionDelay = false }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
      <Grid item>
        <Fade
          in
          style={{
            transitionDelay: transitionDelay ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Grid>
    </Grid>
  );
};

export default Loadable;
