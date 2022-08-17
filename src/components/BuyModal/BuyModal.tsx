import { purchaseSellOrder } from '@/api/endpoints/sellorders';
import { Button } from '@/components/Button';
import { TabPanel } from '@/components/TabPanel';
import type { ISellOrder } from '@/types/assetTypes';
import { Box, Modal, Typography } from '@mui/material';
import classNames from 'classnames';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react';
import { modal, useBuyModalStyles } from './BuyModal.styles';
import { DotStepper } from './components/DotStepper';

export interface IBuyModal {
  isOpen: boolean;
  onClose: () => void;
  totalFractions: number;
  totalPrice: number;
  sellOrder: ISellOrder;
}
//TODO update sellOrder data to reflect the new values
export const BuyModal = ({ isOpen, totalFractions, totalPrice, onClose, sellOrder }: IBuyModal) => {
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

  const handleBuyFractions = async () => {
    const response = await purchaseSellOrder(
      sellOrder.id,
      totalFractions,
      sellOrder.fractionPriceCents,
    );
    // const response = await getSellOrderById(id);
    if (response.status === StatusCodes.CREATED) {
      setValue(1);
    } else {
      if (response.status === StatusCodes.UNAUTHORIZED) {
        setAlertMessage('Please login to buy assets ');
      } else {
        setAlertMessage('Something went wrong.');
      }
      setValue(2);
    }
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
          <Typography variant="h6" component="h2" className={modalClasses.title}>
            Buy {totalFractions} fractions for ${totalPrice}?
          </Typography>
          <Box className={classNames(modalClasses.content, modalClasses.flex)}>
            <Button
              id="confirm"
              className={modalClasses.button}
              onClick={() => {
                handleBuyFractions();
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
            <Typography variant="h6" component="h2" className={modalClasses.title}>
              Success!
            </Typography>
            <Box className={modalClasses.content}>
              <p>
                You successfully bought {totalFractions} fractions for ${totalPrice}!
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
        <TabPanel value={value} index={2} className={modalClasses.center}>
          <Box>
            <Typography variant="h6" component="h2" className={modalClasses.title}>
              {alertMessage ?? 'Something Went Wrong'}
            </Typography>
            <Box className={modalClasses.content}>
              <p></p>
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
