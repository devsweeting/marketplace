import Box from '@mui/material/Box';
import { alpha, Modal } from '@mui/material';
import { Conditional } from './Conditional';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/helpers/auth/CartContext';

export const Checkout = ({ isOpen }: { isOpen: boolean }) => {
  const { closeCart } = useCart();
  const [page, setPage] = useState(0);
  const [height, setHeight] = useState<number>(0);
  const [modalScrollHeight, setModalScrollHeight] = useState<number>(0);
  const ref = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current != null && modalRef.current != null) {
      setHeight(ref.current.clientHeight);
      setModalScrollHeight(modalRef.current?.scrollHeight);
    }
  }, []);

  useEffect(() => {
    //
  }, [page]);

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
    overflowY: modalScrollHeight < height ? 'scroll' : 'auto',
  };

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
      <Box sx={style} ref={modalRef}>
        <Conditional page={page} setPage={setPage} ref={ref} />
      </Box>
    </Modal>
  );
};
