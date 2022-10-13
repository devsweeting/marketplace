import { useEffect, useReducer, useRef, useState } from 'react';
import { Typography, useTheme, Button, alpha } from '@mui/material';
import { Box } from '@mui/system';
import type { Theme } from '@mui/material';
import { useModal } from '@/helpers/hooks/useModal';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/router';
import { apiClient } from '@/api/client';

import { Modal, ModalCard, InputTextField } from './LoginModal.styles';

interface ILoginState {
  isLoading: boolean;
  statCode: number;
  error: string;
}

type LoginAction =
  | { type: 'fetching' }
  | { type: 'success'; payload: StatusCodes }
  | { type: 'fail'; payload: StatusCodes }
  | { type: 'error'; error: Error };

const initialLoginState: ILoginState = {
  isLoading: false,
  statCode: 0,
  error: '',
};

export const validate = (email: string) => {
  if (email.length === 0) {
    return false;
  }
  if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    return false;
  }
  return true;
};

const LoginInput = ({
  theme,
  statCode,
  loginInputValue,
  setLoginInputValue,
  tokenInputValue,
  setTokenInputValue,
  handleLoginSubmit,
  handleTokenSubmit,
}: {
  theme: Theme;
  statCode: number;
  loginInputValue: any;
  setLoginInputValue: any;
  tokenInputValue: any;
  setTokenInputValue: any;
  handleLoginSubmit: any;
  handleTokenSubmit: any;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '170px',
      }}
    >
      {statCode === 0 && (
        <div role="form">
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '100%',
            }}
          >
            give us your email we&#39;ll send you a magic link to log in.
          </Typography>
          <InputTextField
            type="email"
            label={'Email'}
            name={'email'}
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true, name: 'email' }}
            id="email"
            variant="standard"
            placeholder="Email"
            value={loginInputValue}
            onChange={(newValue: { target: { value: string } }) =>
              setLoginInputValue(newValue.target.value)
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setLoginInputValue((e.target as unknown as HTMLTextAreaElement).value);
                handleLoginSubmit(loginInputValue);
              }
            }}
          />
          <Typography>You can use your PWCC email, we will send you a token.</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              marginRight: '0px',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Button
              id={'loginButton'}
              role="button"
              sx={{
                '&.MuiButtonBase-root': {
                  color: 'white',
                  backgroundColor: 'black',
                  width: '100%',
                  height: '56px',
                  margin: '20px 0px',
                  fontSize: '1.3rem',
                  border: '3px solid black',
                  '&:hover': {
                    color: 'black',
                  },
                  [theme.breakpoints.down('sm')]: {
                    margin: '10px auto',
                  },
                },
              }}
              onClick={() => {
                handleLoginSubmit(loginInputValue);
              }}
            >
              Submit
            </Button>
          </Box>
        </div>
      )}
      {statCode === StatusCodes.OK && (
        <form role="form">
          <InputTextField
            label={'code'}
            name={'code'}
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true }}
            id="outlined-basic"
            variant="standard"
            placeholder="Code"
            value={tokenInputValue}
            onChange={(newValue: { target: { value: string } }) =>
              setTokenInputValue(newValue.target.value)
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setTokenInputValue((e.target as unknown as HTMLTextAreaElement).value);
                void handleTokenSubmit(tokenInputValue);
              }
            }}
          />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              marginRight: '0px',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Button
              id={'loginButton'}
              sx={{
                '&.MuiButtonBase-root': {
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '50px',
                  width: '175px',
                  height: '56px',
                  margin: '20px 10px',
                  fontSize: '1.3rem',
                  border: '3px solid black',
                  '&:hover': {
                    color: 'black',
                  },
                  [theme.breakpoints.down('sm')]: {
                    margin: '10px auto',
                  },
                },
              }}
              onClick={() => {
                void handleTokenSubmit(tokenInputValue);
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

const loginReducer = (state: ILoginState, action: LoginAction) => {
  switch (action.type) {
    case 'fetching': {
      return { ...state, isLoading: true, error: '' };
    }
    case 'success': {
      return { ...state, isLoading: false, statCode: action.payload };
    }
    case 'fail': {
      return { ...state, isLoading: false, statCode: action.payload };
    }
    case 'error': {
      return { ...state, isLoading: false, error: action.error.message };
    }
    default: {
      return state;
    }
  }
};

export const LoginModal = ({ open: isOpen, noDismiss }: { open: boolean; noDismiss?: boolean }) => {
  const theme = useTheme();
  const [loginInputValue, setLoginInputValue] = useState('');
  const [tokenInputValue, setTokenInputValue] = useState('');
  const [headerText, setHeaderText] = useState('Login/Signup');
  const [alertMessage, setAlertMessage] = useState(' ');

  const [buttonState, setButtonState] = useState(false);
  const { setIsModalOpen } = useModal();
  const modalBox = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [{ isLoading, error, statCode }, dispatch] = useReducer(loginReducer, initialLoginState);

  const handleClose = (event: any, reason: string) => {
    if (reason && reason == 'backdropClick' && noDismiss) {
      return;
    }
    setIsModalOpen(!isOpen);
    setLoginInputValue('');
    if (statCode === 0 || statCode === StatusCodes.TOO_MANY_REQUESTS) {
      setHeaderText('Login/Signup');
      setAlertMessage('');
    }
    setButtonState(false);
  };

  useEffect(() => {
    //
  }, [loginInputValue, tokenInputValue, buttonState, alertMessage]);

  const handleLoginSubmit = (value: string) => {
    if (!validate(value)) {
      setHeaderText('Enter a valid email');
      setAlertMessage('Example: john.smith@example.com');
      return;
    }
    dispatch({ type: 'fetching' });
    loginRequest(value)
      .then((status) => {
        switch (status) {
          case StatusCodes.OK:
            dispatch({ type: 'success', payload: status });
            setHeaderText('Check your email');
            setAlertMessage(`We emailed a magic link to ${loginInputValue}.
            Please click the link to login or signup.
            Or enter code below
            `);

            return;
          case StatusCodes.TOO_MANY_REQUESTS:
            dispatch({ type: 'fail', payload: status });
            setAlertMessage('Too many requests');
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
      requireAuth: false,
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
      sx={{
        outline: 'none',
        '.MuiBackdrop-root': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.85),
        },
      }}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalCard>
        {statCode === 0 && headerText === 'Login/Signup' ? (
          <>
            <Box sx={{ marginBottom: '40px', width: '100%' }}>
              <Typography
                variant="xl2"
                component="h2"
                sx={{
                  fontSize: '72px',
                  lineHeight: '72px',
                  [theme.breakpoints.down('md')]: {
                    fontSize: '56px',
                  },
                }}
              >
                {headerText}
              </Typography>
              <span style={{ marginBottom: '40px' }} role="alert" ref={modalBox}>
                {alertMessage}
              </span>
              <Typography
                variant="lg"
                sx={{
                  marginTop: '60px',
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontWeight: '500',
                  [theme.breakpoints.down('md')]: {
                    marginTop: '40px',
                  },
                }}
              >
                Save your favourite cards and get notified…
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
              }}
            >
              {!isLoading && !error && (
                <LoginInput
                  theme={theme}
                  statCode={statCode}
                  loginInputValue={loginInputValue}
                  setLoginInputValue={setLoginInputValue}
                  tokenInputValue={tokenInputValue}
                  setTokenInputValue={setTokenInputValue}
                  handleLoginSubmit={handleLoginSubmit}
                  handleTokenSubmit={handleTokenSubmit}
                />
              )}
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ marginBottom: '40px', width: '100%' }}>
              <Typography
                variant="xl2"
                component="h2"
                sx={{
                  fontSize: '72px',
                  lineHeight: '72px',
                  [theme.breakpoints.down('md')]: {
                    fontSize: '56px',
                  },
                }}
              >
                {headerText}
              </Typography>
              <Typography style={{ marginBottom: '40px' }} role="alert" ref={modalBox}>
                {alertMessage}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
              }}
            >
              {!isLoading && !error && (
                <LoginInput
                  theme={theme}
                  statCode={statCode}
                  loginInputValue={loginInputValue}
                  setLoginInputValue={setLoginInputValue}
                  tokenInputValue={tokenInputValue}
                  setTokenInputValue={setTokenInputValue}
                  handleLoginSubmit={handleLoginSubmit}
                  handleTokenSubmit={handleTokenSubmit}
                />
              )}
            </Box>
          </>
        )}
      </ModalCard>
    </Modal>
  );
};
