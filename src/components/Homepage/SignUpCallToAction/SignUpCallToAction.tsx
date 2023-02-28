import { Box, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useModalContext } from '@/helpers/auth/ModalContext';
import { Container, ImgWrapper } from './SignUpCallToAction.styles';
import Image from 'next/image';

export const SignUpCallToAction = () => {
  const { dispatch } = useModalContext();
  const handleClick = () => {
    dispatch({ type: 'login', visible: true });
  };
  return (
    <Container>
      <ImgWrapper>
        <Image
          src={`/images/reflectedCard.png`}
          alt={'reflected Ja Morant'}
          style={{
            borderRadius: '5px',
            opacity: '50%',
          }}
          fill
        />
      </ImgWrapper>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 6,
          gap: '1rem',
        }}
      >
        <Typography variant="xl7" fontWeight={700}>
          New Drops every week
        </Typography>
        <Typography variant="xl">Join our community to start collecting.</Typography>
        <Button
          variant="contained"
          rounded
          onClick={handleClick}
          style={{
            border: '1px solid white',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          Sign up
        </Button>
      </Box>
    </Container>
  );
};
