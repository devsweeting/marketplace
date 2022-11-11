import { useEffect, useRef, useState } from 'react';
import { Box, OutlinedInput, Typography, useTheme } from '@mui/material';
import { Button } from '@/components/Button';
import { useModalContext } from '@/helpers/auth/ModalContext';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/router';

import { Modal, ModalCard, Form, Label } from './LoginModal.styles';
import Link from 'next/link';

export const LoginModal = ({ noDismiss }: { noDismiss?: boolean }) => {
  const [emailState, setEmailState] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const { state, dispatch } = useModalContext();
  const modalBox = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
    setButtonState(false);
  };
  const handleClose = () => {
    if (noDismiss) {
      dispatch({ type: 'login', visible: false });
    }

    setEmailState('');
    setButtonState(false);
    setAlertMessage('');
  };

  useEffect(() => {
    //
  }, [emailState, buttonState, alertMessage]);

  const validate = (email: string) => {
    if (email.length === 0) {
      return false;
    }
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    validate(emailState);
    if (!validate(emailState)) {
      setAlertMessage('Please enter a valid email address');
      if (modalBox.current) {
        modalBox.current.style.color = '#f44336';
      }
      return;
    }

    loginRequest(emailState)
      .then((status) => {
        switch (status) {
          case StatusCodes.OK:
            setAlertMessage('Check your email for a link to sign in.');
            if (modalBox.current) {
              modalBox.current.style.color = '#4caf50';
            }
            setButtonState(true);
            return;
          case StatusCodes.TOO_MANY_REQUESTS:
            setAlertMessage('Too many requests. Please try again later.');
            if (modalBox.current) {
              modalBox.current.style.color = '#f44336';
            }
            setButtonState(true);
            return;
          default:
            if (modalBox.current) {
              setAlertMessage('Something went wrong. Please try again later.');
              modalBox.current.style.color = '#ffae00';
            }
        }
      })
      .catch(() => {
        if (modalBox.current) {
          setAlertMessage('Something went wrong. Please try again later.');
          modalBox.current.style.color = '#ffae00';
        }
      })
      .finally(() => {
        setButtonState(true);
      });
  };
  return (
    <Modal
      open={state.login}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalCard>
        <Typography id="modal-modal-title" variant="xl4" fontWeight={700}>
          Login
        </Typography>

        <Typography variant="body2" color="error" role="alert" ref={modalBox}>
          {alertMessage}
        </Typography>
        <Form onSubmit={handleSubmit} data-testid="form">
          <Label htmlFor="email" aria-label="email">
            email
          </Label>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={emailState}
          />
          <Button id="submit" variant="contained" disabled={buttonState} name="Login" type="submit">
            Login
          </Button>
        </Form>
        {noDismiss ? (
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Link href={''}>
              <a
                onClick={() => {
                  router.back();
                }}
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Go back
              </a>
            </Link>
            <Link href={'/explore'}>
              <a
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                Explore
              </a>
            </Link>
          </Box>
        ) : (
          ''
        )}
      </ModalCard>
    </Modal>
  );
};
