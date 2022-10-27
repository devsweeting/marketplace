import Box from '@mui/material/Box';
import { alpha, Modal } from '@mui/material';
import { Conditional } from './Conditional';
import { useLayoutEffect, useRef, useState } from 'react';
import { useCart } from '@/helpers/auth/CartContext';

export const Checkout = ({ isOpen }: { isOpen: boolean }) => {
  const { closeCart } = useCart();
  const [page, setPage] = useState(0);
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

  useLayoutEffect(() => {
    if (ref.current != null && ref.current.clientHeight && ref.current.scrollHeight) {
      setHeight(ref.current?.clientHeight);
      setScrollHeight(ref.current.scrollHeight);
    }
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={closeCart}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.85),
        },
      }}
    >
      <Box ref={ref} sx={style}>
        <Conditional page={page} setPage={setPage} />
      </Box>
    </Modal>
  );
};
