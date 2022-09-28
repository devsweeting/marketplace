import React, { useEffect, useReducer, useState } from 'react';
import { Box, Button, Card, TextField, Typography, useTheme } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import { validate } from '@/components/LoginModal/LoginModal';
import { Loader } from '@/components/Loader';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { apiClient } from '@/api/client';
import { useRouter } from 'next/router';

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

export const NoDismissLogin = () => {
  const theme = useTheme();
  const [loginInputValue, setLoginInputValue] = useState('');
  const [tokenInputValue, setTokenInputValue] = useState('');
  const router = useRouter();
  const [headerText, setHeaderText] = useState('Login To Continue');
  const [{ isLoading, error, statCode }, dispatch] = useReducer(loginReducer, initialLoginState);

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

  useEffect(() => {
    //
  }, [loginInputValue]);

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
  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1,
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{ padding: '30px' }}>
          <Box sx={{ margin: '20px', width: '100%' }}>
            <Typography variant="h2" component="h2">
              {'Just a moment...'}
            </Typography>
          </Box>
          <Box
            sx={{
              margin: '40px 20px',
              display: 'flex',
            }}
          >
            <Loader />
          </Box>
        </Card>
      </Box>
    );
  }
  if (error !== '') {
    return (
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1,
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{ padding: '30px' }}>
          <Box sx={{ margin: '20px', width: '100%' }}>
            <Typography variant="h2" component="h2">
              {'Something went wrong. Please try again.'}
            </Typography>
          </Box>
          <Box
            sx={{
              margin: '40px 20px',
              display: 'flex',
            }}
          >
            <TextField
              InputProps={{ inputProps, disableUnderline: true }}
              id="outlined-basic"
              variant="standard"
              placeholder="Email"
              value={loginInputValue}
              onChange={(newValue) => setLoginInputValue(newValue.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setLoginInputValue((e.target as unknown as HTMLTextAreaElement).value);
                  handleLoginSubmit(loginInputValue);
                }
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderRadius: '50px',
                width: '100%',
                height: '75px',
                fontSize: '1.5rem',
                border: '2px solid grey',
                backgroundColor: 'white',
                '& input': {
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 600,
                  marginLeft: '20px',
                  width: '400px',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: 18,
                  },
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px 0px',
                  width: '95%',
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              marginRight: '40px',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                color: 'white',
                backgroundColor: 'black',
                borderRadius: '50px',
                width: '175px',
                height: '75px',
                margin: '0 20px',
                fontSize: '1.3rem',
                border: '3px solid black',
                '&:hover': {
                  color: 'black',
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px auto',
                },
              }}
              onClick={() => {
                handleLoginSubmit(loginInputValue);
              }}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </Box>
    );
  }
  if (statCode === StatusCodes.OK) {
    return (
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1,
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{ padding: '30px' }}>
          <Box sx={{ margin: '20px', width: '100%' }}>
            <Typography variant="h2" component="h2">
              {headerText}
            </Typography>
          </Box>
          <Box
            sx={{
              margin: '40px 20px',
              display: 'flex',
            }}
          >
            <TextField
              InputProps={{ inputProps, disableUnderline: true }}
              id="outlined-basic"
              variant="standard"
              placeholder="Code"
              value={tokenInputValue}
              onChange={(newValue) => setTokenInputValue(newValue.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setTokenInputValue((e.target as unknown as HTMLTextAreaElement).value);
                  void handleTokenSubmit(tokenInputValue);
                }
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderRadius: '50px',
                width: '100%',
                height: '75px',
                fontSize: '1.5rem',
                border: '2px solid grey',
                backgroundColor: 'white',
                '& input': {
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 600,
                  marginLeft: '20px',
                  width: '400px',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: 18,
                  },
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px 0px',
                  width: '95%',
                },
              }}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              marginRight: '40px',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                color: 'white',
                backgroundColor: 'black',
                borderRadius: '50px',
                width: '175px',
                height: '75px',
                margin: '0 20px',
                fontSize: '1.3rem',
                border: '3px solid black',
                '&:hover': {
                  color: 'black',
                },
                [theme.breakpoints.down('sm')]: {
                  margin: '10px auto',
                },
              }}
              onClick={() => {
                void handleTokenSubmit(tokenInputValue);
              }}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 1,
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ padding: '30px' }}>
        <Box sx={{ margin: '20px', width: '100%' }}>
          <Typography variant="h2" component="h2">
            {headerText}
          </Typography>
        </Box>
        <Box
          sx={{
            margin: '40px 20px',
            display: 'flex',
          }}
        >
          <TextField
            InputProps={{ inputProps, disableUnderline: true }}
            id="outlined-basic"
            variant="standard"
            placeholder="Email"
            value={loginInputValue}
            onChange={(newValue) => setLoginInputValue(newValue.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setLoginInputValue((e.target as unknown as HTMLTextAreaElement).value);
                handleLoginSubmit(loginInputValue);
              }
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderRadius: '50px',
              width: '100%',
              height: '75px',
              fontSize: '1.5rem',
              border: '2px solid grey',
              backgroundColor: 'white',
              '& input': {
                color: 'black',
                fontSize: 20,
                fontWeight: 600,
                marginLeft: '20px',
                width: '400px',
                [theme.breakpoints.down('sm')]: {
                  fontSize: 18,
                },
              },
              [theme.breakpoints.down('sm')]: {
                margin: '10px 0px',
                width: '95%',
              },
            }}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            marginRight: '40px',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '50px',
              width: '175px',
              height: '75px',
              margin: '0 20px',
              fontSize: '1.3rem',
              border: '3px solid black',
              '&:hover': {
                color: 'black',
              },
              [theme.breakpoints.down('sm')]: {
                margin: '10px auto',
              },
            }}
            onClick={() => {
              handleLoginSubmit(loginInputValue);
            }}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
