import type { Dispatch, SetStateAction } from 'react';
import { AskingPrice } from '../AskingPrice';
import { Cart } from '../Cart';
import { PaymentMethods } from '../PaymentMethods';

export const Conditional = ({
  page,
  setPage,
  ref,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  ref: RefObject<HTMLDivElement>;
}) => {
  const conditionalComponent = () => {
    switch (page) {
      case 0: {
        return <Cart setPage={setPage} page={page} ref={ref} />;
      }
      case 1: {
        return <PaymentMethods setPage={setPage} page={page} ref={ref} />;
      }
      case 2: {
        return <AskingPrice setPage={setPage} page={page} />;
      }
      default: {
        return <Cart setPage={setPage} page={page} />;
      }
    }
  };
  return <>{conditionalComponent()}</>;
};
