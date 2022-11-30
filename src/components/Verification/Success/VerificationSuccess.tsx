import { Button } from '@/components/Button';
import LockRounded from '@mui/icons-material/LockRounded';
import { styled, Typography } from '@mui/material';

const Container = styled('div')({
  width: 400,
});

const Text = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '1rem',
});

type Props = {
  redirect: () => void;
  message?: string;
};

export function VerificationSuccess({ redirect, message }: Props) {
  return (
    <Container>
      <Text>
        <LockRounded fontSize="large" />
        <Typography variant="xl4" fontWeight={700}>
          Successfully verified
        </Typography>
        <Typography>
          {message ? message : 'Your identity has been successfully verified.'}
        </Typography>
      </Text>
      <Button variant="contained" onClick={redirect} fullWidth>
        Back
      </Button>
    </Container>
  );
}
