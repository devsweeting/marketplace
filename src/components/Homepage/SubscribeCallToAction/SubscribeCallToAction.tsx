import { Box, Button, TextField, Typography } from '@mui/material';
import { useTextfieldStyles, useSubscribeCTAStyles } from './SubscribeCallToAction.styles';
import React from 'react';

export const SubscribeCallToAction = () => {
  const classes = useTextfieldStyles();
  const styles = useSubscribeCTAStyles();
  return (
    <Box className={styles.ctaWrapper}>
      <Typography variant="xl5" component="h2" className={styles.ctaHeader}>
        Get weekly drops
      </Typography>
      <form className={styles.submitForm}>
        <TextField
          InputProps={{ classes, disableUnderline: true }}
          id="outlined-basic"
          variant="standard"
          placeholder="Email"
          className={styles.textfieldInput}
        />
        <Button className={styles.button}>Subscribe</Button>
      </form>
    </Box>
  );
};
