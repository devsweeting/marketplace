import { Typography } from '@mui/material';
import { Wrapper, InputContainer } from './SubscribeCallToAction.styles';
import React from 'react';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';

export const SubscribeCallToAction = () => {
  return (
    <Wrapper>
      <Typography variant="xl5" fontWeight={700}>
        Get weekly drops
      </Typography>
      <InputContainer>
        <TextField id="outlined-basic" variant="outlined" placeholder="Email" rounded />
        <Button variant="contained" rounded>
          Subscribe
        </Button>
      </InputContainer>
    </Wrapper>
  );
};
