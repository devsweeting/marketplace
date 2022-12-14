import Box from '@mui/material/Box';
import { alpha, Modal } from '@mui/material';
import { Conditional } from './Conditional';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/helpers/auth/CartContext';

export const Checkout = ({ isOpen }: { isOpen: boolean }) => {
  const { closeModal } = useCart();
  const ref = useRef(null as null | HTMLDivElement);
  const [height, setHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    height: 'max-content',
    maxHeight: 'calc(100% - 80px)',
    maxWidth: '1024px',

    bgcolor: 'background.paper',
    outline: 'none !important',
    overflowY: scrollHeight < height ? 'scroll' : 'auto',
  };

  useEffect(() => {
    if (ref.current != null && ref.current.clientHeight && ref.current.scrollHeight) {
      setHeight(ref.current?.clientHeight);
      setScrollHeight(ref.current.scrollHeight);
    }
  }, []);

  if (!(Object.keys(ref).length > 0)) {
    return null;
  }
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.85),
        },
      }}
    >
      <Box ref={ref} sx={style}>
        <Conditional />
      </Box>
    </Modal>
  );
};