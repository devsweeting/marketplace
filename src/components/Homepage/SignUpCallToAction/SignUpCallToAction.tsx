import { Box, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useModalContext } from '@/helpers/auth/ModalContext';
import { Container, Square } from './SignUpCallToAction.styles';

export const SignUpCallToAction = () => {
  const { dispatch } = useModalContext();
  const handleClick = () => {
    dispatch({ type: 'login', visible: true });
  };
  return (
    <Container>
      <Square sx={{ right: '20%', top: 170 }} />
      <Square sx={{ left: -70 }} />
      <Square sx={{ right: -70, bottom: 130 }} />
      <Square sx={{ left: '20%', bottom: 130 }} />
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
        <Typography variant="xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Button variant="contained" rounded onClick={handleClick}>
          Sign up
        </Button>
      </Box>
    </Container>
  );
};
