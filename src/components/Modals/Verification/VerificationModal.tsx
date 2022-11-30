import { Button } from '@/components/Button';
import { ModalCard } from '@/components/LoginModal/LoginModal.styles';
import { useModalContext } from '@/helpers/auth/ModalContext';
import { LockOpenRounded } from '@mui/icons-material';
import { Modal, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Text = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export function VerificationModal() {
  const { state, dispatch } = useModalContext();
  const router = useRouter();

  const redirect = async () => {
    dispatch({ type: 'verification', visible: false });

    await router.push('/verify');
  };

  const close = () => {
    dispatch({ type: 'verification', visible: false });
  };

  return (
    <Modal
      open={state.verification}
      onClose={close}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalCard>
        <Text>
          <LockOpenRounded fontSize="large" />
          <Typography variant="xl4" fontWeight={700}>
            Verify your identity
          </Typography>
          <Typography>We need some information before you can proceed.</Typography>
        </Text>
        <Button variant="contained" onClick={() => void redirect()} fullWidth>
          Verify
        </Button>
      </ModalCard>
    </Modal>
  );
}
