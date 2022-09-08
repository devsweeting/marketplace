import { Box, Button, TextField, Typography } from '@mui/material';
import { useTextfieldStyles } from './SubscribeCallToAction.styles';
import React from 'react';

export const SubscribeCallToAction = () => {
  const classes = useTextfieldStyles();
  return (
    <Box
      style={{
        width: '100%',
        minWidth: '100%',
        height: '300px',
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h2" component="h2" style={{ marginBottom: '15px', fontSize: '3rem' }}>
        Get weekly drops
      </Typography>
      <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          InputProps={{ classes, disableUnderline: true }}
          id="outlined-basic"
          variant="standard"
          placeholder="Email"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: '50px',
            width: '375px',
            height: '75px',
            marginLeft: '30px',
            fontSize: '1.5rem',
            border: '2px solid grey',
            backgroundColor: 'white',
          }}
        />
        <Button
          style={{
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '50px',
            width: '175px',
            height: '75px',
            marginLeft: '30px',
            fontSize: '1.3rem',
            border: '3px solid black',
          }}
        >
          Subscribe
        </Button>
      </form>
    </Box>
  );
};
