import { useEffect, useRef, useState } from 'react';
import Modal from '@mui/material/Modal';
import { modal, title, useCustomModalStyles } from './LoginModal.styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@/components/Button';
import { useModal } from '@/helpers/hooks/useModal';
import LoginIcon from '@mui/icons-material/Login';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { StatusCodes } from 'http-status-codes';

export const LoginModal = ({ open: isOpen }: { open: boolean }) => {
  const customModalClasses = useCustomModalStyles();
  const [emailState, setEmailState] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const { setIsModalOpen } = useModal();
  const modalBox = useRef<HTMLDivElement>(null);

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
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={customModalClasses.container}
    >
      <Box sx={modal} className={`${customModalClasses.modal}`} id="modal">
        <Typography id="modal-modal-title" variant="lg" component="h2" sx={title}>
          Login
        </Typography>

        <span className={customModalClasses.message} role="alert" ref={modalBox}>
          {alertMessage}
        </span>
        <form onSubmit={handleSubmit}>
          <div className={customModalClasses.formBox} role={'form'}>
            <label htmlFor="email" aria-label="email" className={customModalClasses.srOnly}>
              email
            </label>
            <input
              id="email"
              name="email"
              className={customModalClasses.wrapper}
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={emailState}
            />

            <Button
              id="submit"
              disabled={buttonState}
              className={customModalClasses.button}
              name="Login"
              type="submit"
            >
              Login <LoginIcon />
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
