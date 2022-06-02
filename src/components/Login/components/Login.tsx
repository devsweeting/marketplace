import React, { useRef, useEffect } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { useNavLinkStyles } from '../../Navbar/components/NavLink/NavLink.styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLoginStyles, modal } from './Login.styles';
import classNames from 'classnames';
import { Button } from '@/components/Button';


export const Login = () => {
    const modalBox = useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);

    const [emailState, setEmailState] = React.useState('');

    const [buttonState, setButtonState] = React.useState(false);

    useEffect(()=>{}, [emailState, buttonState])

    const classes = useNavLinkStyles();

    const loginClasses = useLoginStyles();

    const handleOpen = () => setOpen(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailState(e.target.value);
    }
    const handleClose = () => setOpen(false);

    const validate = (email: string) => {
       if (email.length === 0) {
        return false;
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return false;
      }
        return true;
    }

    const handleSubmit = (e: React.SyntheticEvent)=>{
        e.preventDefault()
        validate(emailState)
        if(!validate(emailState)){
            modalBox.current!.innerText = 'Invalid email'
            modalBox.current!.style.color = '#f44336'
            return;
        }
      
       const formBody = encodeURIComponent('email') + '=' + encodeURIComponent(emailState);
        fetch('http://localhost:3001/v1/users/login/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then(res => res.json())
        .then(data => {
            if(data.status=== 200){
                modalBox.current!.innerText = 'Check your email for a link to sign in.'
                modalBox.current!.style.color = '#4caf50'
                setButtonState(true)
                return;
            }
           if (data.status === 429) {
            modalBox.current!.innerText = 'Too many requests. Please try again later.'
            modalBox.current!.style.color = '#f44336'
            return;
           }
           modalBox.current!.innerText = 'Something went wrong.'
           modalBox.current!.style.color = '#ffae00'
        })
    }



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
        <Box sx={modal} className={`${loginClasses.modal} `}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
            <span className={loginClasses.message} ref={modalBox}>
              
            </span>
          <form onSubmit={handleSubmit} >
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