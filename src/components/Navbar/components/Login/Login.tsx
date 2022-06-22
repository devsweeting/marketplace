import { useState, useRef, useEffect } from 'react';
import { useNavLinkStyles } from '../NavLink/NavLink.styles';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { CustomModal } from '@/components/Modals/CustomModal';
import { useModal } from '@/helpers/hooks/useModal';

export const Login = () => {
  const modalBox = useRef<HTMLDivElement>(null);

  const { isOpen, setIsOpen } = useModal();

  const [emailState, setEmailState] = useState('');

  const [buttonState, setButtonState] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const classes = useNavLinkStyles();

  const handleOpen = () => setIsOpen(!isOpen);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
    setButtonState(false);
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
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
    setButtonState(true);
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
    }).then((res) => {
      switch (res.status) {
        case 200:
          setAlertMessage('Check your email for a link to sign in.');
          if (modalBox.current) {
            modalBox.current.style.color = '#4caf50';
          }
          setButtonState(true);
          return;
        case 429:
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
    });
  };

  return (
    <div>
      <a style={{ textDecoration: 'none' }} onClick={handleOpen}>
        <Typography variant="h4" component="span" className={classNames(classes.navLink)}>
          Login
        </Typography>
      </a>
      <CustomModal
        open={isOpen}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        alertMessage={alertMessage}
        emailState={emailState}
        buttonState={buttonState}
        modalBox={modalBox}
      />
    </div>
  );
};
