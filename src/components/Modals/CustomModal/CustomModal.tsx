import Modal from '@mui/material/Modal';
import { useCustomModalStyles, modal, title } from './CustomModal.styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@/components/Button';
import LoginIcon from '@mui/icons-material/Login';

import type { ChangeEvent, SyntheticEvent } from 'react';

export const CustomModal = ({
  open: isOpen,
  handleClose,
  handleChange,
  buttonState,
  modalBox,
  alertMessage,
  handleSubmit,
  emailState,
}: {
  open: boolean;
  handleClose: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: SyntheticEvent<Element, Event>) => void;
  alertMessage: string;
  emailState: string;
  buttonState: boolean;
  modalBox: React.RefObject<HTMLDivElement>;
}) => {
  const customModalClasses = useCustomModalStyles();
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modal} className={`${customModalClasses.modal}`} id="modal">
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={title}>
          Login
        </Typography>

        <span className={customModalClasses.message} role="alert" ref={modalBox}>
          {alertMessage}
        </span>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', marginBottom: '5px', justifyContent: 'flex-start' }}>
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
