import { purchaseSellOrder } from '@/api/endpoints/sellorders';
import { Button } from '@/components/Button';
import { TabPanel } from '@/components/TabPanel';
import { useUser } from '@/helpers/hooks/useUser';
import type { ISellOrder } from '@/types/assetTypes';
import { Box, Typography } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react';
import { DotStepper } from './components/DotStepper';

import { Modal, ModalContainer, Title, ButtonContainer } from './BuyModal.styles';

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
  const [value, setValue] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [fractionState, setFractionState] = useState<number | undefined>();
  const steps = ['Confirm', 'Success'];
  const user = useUser();

  useEffect(() => {
    //
  }, [totalPrice, fractionState, alertMessage, value]);

  const resetState = () => {
    setAlertMessage('');
    setFractionState(0);
    setValue(0);
  };

  const handleBuyFractions = async (): Promise<void> => {
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

  if (!user) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalContainer>
        <DotStepper value={value} steps={steps} />
        <TabPanel value={value} index={0}>
          <Title variant="xl3">
            Buy {totalFractions} fractions for ${totalPrice}?
          </Title>
          <ButtonContainer>
            <Button id="confirm" onClick={() => void handleBuyFractions()}>
              confirm
            </Button>
            <Button
              id="back"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </ButtonContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Title variant="xl3">Success!</Title>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography sx={{ textAlign: 'center' }}>
              You successfully bought {totalFractions} fractions for ${totalPrice}!
            </Typography>
            <ButtonContainer>
              <Button
                id="close"
                onClick={() => {
                  handleClose();
                }}
                fullWidth
              >
                close
              </Button>
            </ButtonContainer>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>
            <Title variant="xl3">{alertMessage ?? 'Something Went Wrong'}</Title>
            <Box sx={{ marginTop: '1rem' }}>
              <Button
                id="close"
                onClick={() => {
                  handleClose();
                }}
                fullWidth
              >
                close
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </ModalContainer>
    </Modal>
  );
};
