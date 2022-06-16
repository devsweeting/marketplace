import React, { useState, useRef, useEffect } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { useNavLinkStyles } from '../NavLink/NavLink.styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLoginStyles, modal, title } from './Login.styles';
import classNames from 'classnames';
import { Button } from '@/components/Button';

export const Login = () => {
  const modalBox = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [emailState, setEmailState] = useState('');

  const [buttonState, setButtonState] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const classes = useNavLinkStyles();

  const loginClasses = useLoginStyles();

  const handleOpen = () => setOpen(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
    setButtonState(false);
  };
  const handleClose = () => setOpen(false);

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

    const formBody = encodeURIComponent('email') + '=' + encodeURIComponent(emailState);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setAlertMessage('Check your email for a link to sign in.');
          if (modalBox.current) {
            modalBox.current.style.color = '#4caf50';
          }
          setButtonState(true);
          return;
        }
        if (data.statusCode === 429) {
          setAlertMessage('Too many requests. Please try again later.');
          if (modalBox.current) {
            modalBox.current.style.color = '#f44336';
          }
          setButtonState(true);
          return;
        }
        if (modalBox.current) {
          setAlertMessage('Something went wrong. Please try again later.');
          modalBox.current.style.color = '#ffae00';
        }
      });
  };

  return (
    <div>
      <a style={{ textDecoration: 'none' }} onClick={handleOpen}>
        <Typography variant="h4" component="span" className={classNames(classes.navLink)}>
          Login
        </Typography>
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal} className={`${loginClasses.modal}`} id="modal">
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={title}>
            Login
          </Typography>

          <span className={loginClasses.message} role="alert" ref={modalBox}>
            {alertMessage}
          </span>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', marginBottom: '5px', justifyContent: 'flex-start' }}>
              <label htmlFor="email" aria-label="email" className={loginClasses.srOnly}>
                email
              </label>
              <input
                id="email"
                name="email"
                className={loginClasses.wrapper}
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={emailState}
              />

              <Button
                id="submit"
                disabled={buttonState}
                className={loginClasses.button}
                name="Login"
                type="submit"
              >
                Login <LoginIcon />
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
