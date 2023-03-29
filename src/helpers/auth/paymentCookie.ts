import { setCookie, destroyCookie, parseCookies } from 'nookies';

const STRIPE_PAYMENT_INTENT_ID = 'PAYMENT_INTENT_ID';

export const getPaymentIntentCookie = (): string | null => {
  const cookies = parseCookies(null, {});

  if (cookies.hasOwnProperty(STRIPE_PAYMENT_INTENT_ID)) {
    const paymentIntentId = cookies[STRIPE_PAYMENT_INTENT_ID];

    return paymentIntentId;
  } else {
    return null;
  }
};

export const setPaymentIntentCookie = (id: string) => {
  setCookie(null, STRIPE_PAYMENT_INTENT_ID, id, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const destroyPaymentIntentCookie = () => {
  destroyCookie(null, STRIPE_PAYMENT_INTENT_ID);
};
