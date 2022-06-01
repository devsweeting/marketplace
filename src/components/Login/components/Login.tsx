import React, { useRef, useEffect } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { useNavLinkStyles } from '../../Navbar/components/NavLink/NavLink.styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLoginStyles } from './Login.styles';
import classNames from 'classnames';
import { Button } from '@/components/Button';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    p: 4,
  };

export const Login = () => {
   const modalBox = useRef<HTMLDivElement>(null);
   const buttonElement = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [emailState, setEmailState] = React.useState('');
    const [buttonState, setButtonState] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailState(e.target.value);
    }
    const handleClose = () => setOpen(false);
    const validate = (email: string) => {
       if (email.length === 0) {
        return false;
      }
      if (email.indexOf('@') === -1) {
        return false;
      }
      if (email.indexOf(' ') !== -1) {
        return false;
      }
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return true;
      }
    }
    const handleSubmit = (e: React.SyntheticEvent)=>{
        e.preventDefault()
        validate(emailState)
        if(!validate(emailState)){
            modalBox.current!.innerText = 'Invalid email'
            modalBox.current!.style.color = 'red'
        }
        fetch('http://localhost:3001/v1/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailState
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        //     if(data.status=== 200){
        //         modalBox.current!.innerText = 'Check your email for a link to sign in.'
        //         modalBox.current!.style.color = 'green'
        //         setButtonState(true)
        //     }
        //    if (data.status === 429) {
        //     modalBox.current!.innerText = 'Too many requests. Please try again later.'
        //     modalBox.current!.style.color = 'red'
        //    }
        })
    }
    const classes = useNavLinkStyles();
    const loginClasses = useLoginStyles();

    useEffect(()=>{
    }, [emailState, buttonState])
  return (
    <div>
       <a style={{ textDecoration: 'none' }} onClick={handleOpen} >
        <Typography
          variant="h4"
          component="span"
          className={classNames(classes.navLink)}
        >
          Login
        </Typography>
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} className={loginClasses.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
            <span className={loginClasses.message} ref={modalBox}>
              
            </span>
          <form onSubmit={handleSubmit} action="/v1/users/login/request " method='POST' >
              <div style={{display: 'flex', marginBottom: '5px', justifyContent: 'flex-start'}}>
              <input className={loginClasses.wrapper} type="email" placeholder='Email Address' onChange={handleChange}/>
              <Button disabled={buttonState} className={loginClasses.button} type="submit">Login <LoginIcon /></Button>
              </div>
          </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Login