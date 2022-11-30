import { Button } from '@/components/Button';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';

const Container = styled('div')({
  width: 400,
});

const Text = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  textAlign: 'center',
});

type Props = {
  redirect: () => void;
  message: string;
};

export function VerificationFailure({ redirect, message }: Props) {
  return (
    <Container>
      <Text>
        <ErrorOutlineRounded fontSize="large" color="error" />
        <Typography variant="xl4" fontWeight={700}>
          Failed to Verify
        </Typography>
        <Typography>{message}</Typography>
      </Text>
      <Button variant="contained" onClick={redirect} fullWidth>
        Back
      </Button>
    </Container>
  );
}
