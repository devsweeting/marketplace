import { useEffect, useRef, useState } from 'react';
import { OutlinedInput, Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useModal } from '@/helpers/hooks/useModal';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/router';

import { Modal, ModalCard, Form, Label } from './LoginModal.styles';
export const validate = (email: string) => {
  if (email.length === 0) {
    return false;
  }
  if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    return false;
  }
  return true;
};

export const LoginModal = ({ open: isOpen }: { open: boolean }) => {
  const [emailState, setEmailState] = useState('');
  const [tokenInputValue, setTokenInputValue] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const { setIsModalOpen } = useModal();
  const modalBox = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const inputProps = {
    root: {
      '& .MuiFormLabel-root.Mui-error': {
        color: '#b04995',
      },
      '& input': {
        color: 'black',
        fontSize: 20,
        fontWeight: 600,
        marginLeft: 20,
        width: '400px',
        maxWidth: '400px',
        [theme.breakpoints.down('sm')]: {
          fontSize: 18,
        },
      },
      '& .MuiFormLabel-filled + .MuiInputBase-root input': {
        padding: '35px 12px 14px',
        [theme.breakpoints.down('sm')]: {
          padding: '15px 6px 7px',
        },
      },
      '& .Mui-focused input': {
        padding: '35px 12px 14px',
        [theme.breakpoints.down('sm')]: {
          padding: '15px 6px 7px',
        },
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: '#b04995',
        fontFamily: 'Muli',
        fontSize: 12,
      },
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
    setButtonState(false);
  };
  const handleClose = () => {
    setIsModalOpen(!isOpen);
    setEmailState('');
    setButtonState(false);
    setAlertMessage('');
  };

  useEffect(() => {
    //
  }, [emailState, buttonState, alertMessage]);

  // const handleSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();

  //   validate(emailState);
  //   if (!validate(emailState)) {
  //     setAlertMessage('Please enter a valid email address');
  //     if (modalBox.current) {
  //       modalBox.current.style.color = '#f44336';
  //     }
  //     return;
  //   }

  //   loginRequest(emailState)
  //     .then((status) => {
  //       switch (status) {
  //         case StatusCodes.OK:
  //           setAlertMessage('Check your email for a link to sign in.');
  //           if (modalBox.current) {
  //             modalBox.current.style.color = '#4caf50';
  //           }
  //           setButtonState(true);
  //           return;
  //         case StatusCodes.TOO_MANY_REQUESTS:
  //           setAlertMessage('Too many requests. Please try again later.');
  //           if (modalBox.current) {
  //             modalBox.current.style.color = '#f44336';
  //           }
  //           setButtonState(true);
  //           return;
  //         default:
  //           if (modalBox.current) {
  //             setAlertMessage('Something went wrong. Please try again later.');
  //             modalBox.current.style.color = '#ffae00';
  //           }
  //       }
  //     })
  //     .catch(() => {
  //       if (modalBox.current) {
  //         setAlertMessage('Something went wrong. Please try again later.');
  //         modalBox.current.style.color = '#ffae00';
  //       }
  //     })
  //     .finally(() => {
  //       setButtonState(true);
  //     });
  // };

  const handleLoginSubmit = (value: string) => {
    if (!validate(value)) {
      setHeaderText('Please enter a valid email');
      return;
    }
    dispatch({ type: 'fetching' });
    loginRequest(value)
      .then((status) => {
        switch (status) {
          case StatusCodes.OK:
            dispatch({ type: 'success', payload: status });
            setHeaderText('Check your email');
            return;
          case StatusCodes.TOO_MANY_REQUESTS:
            dispatch({ type: 'fail', payload: status });
            return;
          default:
            dispatch({ type: 'fail', payload: 408 });
            return;
        }
      })
      .catch((error) => {
        dispatch({ type: 'error', error });
      });
  };

  const handleTokenSubmit = async (token: string) => {
    const response = await apiClient.post('/login/confirm', {
      body: {
        token: token,
      },
    });
    if (!response.ok) {
      return;
    }
    router.reload();
  };
  return (
    <Modal
      open={isOpen}
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
      </ModalCard>
    </Modal>
  );
};
