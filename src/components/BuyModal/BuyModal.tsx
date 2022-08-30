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
  updateAsset: (assetId: string) => void;
}
export const BuyModal = ({
  isOpen,
  totalFractions,
  totalPrice,
  onClose,
  sellOrder,
  updateAsset,
}: IBuyModal) => {
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
    const response: any = await purchaseSellOrder(
      sellOrder.id,
      totalFractions,
      sellOrder.fractionPriceCents,
    );
    updateAsset(sellOrder.assetId);
    switch (response.status) {
      case StatusCodes.CREATED:
        setValue(1);
        break;
      case StatusCodes.BAD_REQUEST:
        setAlertMessage('You cannot purchase any more of this item at this time.');
        if (response.data.message === 'USER_CANNOT_PURCHASE_OWN_ORDER') {
          setAlertMessage('You cannot purchase your own order.');
        }
        setValue(2);
        break;
      case StatusCodes.UNAUTHORIZED:
        setAlertMessage('Please login to buy assets');
        setValue(2);
        break;
      default:
        setAlertMessage('Something went wrong.');
        setValue(2);
        break;
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
                void handleBuyFractions();
              }}
            >
              confirm
            </Button>
            <Button
              id="back"
              className={modalClasses.button}
              sx={{ marginLeft: '10px' }}
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
              <Typography sx={{ textAlign: 'center' }}>
                You successfully bought {totalFractions} fractions for ${totalPrice}!
              </Typography>
              <Button
                id="close"
                className={modalClasses.button}
                sx={{ width: '100%' }}
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
