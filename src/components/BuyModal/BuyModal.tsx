import { Button } from '@/components/Button';
import { TabPanel } from '@/components/TabPanel';
import { Box, Modal, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { modal, title, useBuyModalStyles } from './BuyModal.styles';
import { DotStepper } from './components/DotStepper';

export interface IBuyModal {
  isOpen: boolean;
  onClose: () => void;
  fractions: number;
  totalPrice: number;
}

export const BuyModal = ({ isOpen, fractions, totalPrice, onClose }: IBuyModal) => {
  const modalClasses = useBuyModalStyles();
  const [value, setValue] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [fractionState, setFractionState] = useState<number | undefined>();
  const steps = ['Confirm', 'Success'];

  useEffect(() => {
    //
  }, [totalPrice, fractionState, alertMessage, value]);

  const resetState = () => {
    setAlertMessage('');
    setFractionState(0);
    setValue(0);
  };
  const handleClose = () => {
    if (value > 0) {
      resetState();
    }
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modal} className={modalClasses.modal}>
        <DotStepper value={value} steps={steps} />
        <TabPanel value={value} index={0} className={modalClasses.center}>
          <Typography variant="h6" component="h2" sx={title}>
            Buy {fractions} fractions for ${totalPrice}?
          </Typography>
          <Box className={classNames(modalClasses.content, modalClasses.flex)}>
            <Button
              id="confirm"
              className={modalClasses.button}
              onClick={() => {
                setValue(1);
              }}
            >
              confirm
            </Button>
            <Button
              id="back"
              className={modalClasses.button}
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} className={modalClasses.center}>
          <Box>
            <Typography variant="h6" component="h2" sx={title}>
              Success!
            </Typography>
            <Box className={modalClasses.content}>
              <p>
                You successfully bought {fractions} fractions for ${totalPrice}!
              </p>
              <Button
                id="close"
                className={modalClasses.button}
                onClick={() => {
                  handleClose();
                }}
              >
                close
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Modal>
  );
};
