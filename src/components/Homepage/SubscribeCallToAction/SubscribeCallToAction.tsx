import { Typography, TextField } from '@mui/material';
import { Wrapper, InputContainer } from './SubscribeCallToAction.styles';
import React from 'react';
import { Button } from '@/components/Button';

export const SubscribeCallToAction = () => {
  return (
    <Wrapper>
      <Typography variant="xl5" fontWeight={700}>
        Get weekly drops
      </Typography>
      <InputContainer>
        <TextField
          inputProps={{ disableUnderline: true }}
          id="outlined-basic"
          variant="outlined"
          placeholder="Email"
        />
        <Button variant="contained" rounded>
          Subscribe
        </Button>
      </InputContainer>
    </Wrapper>
  );
};
