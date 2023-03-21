// import { getCookie, setCookie } from 'cookies-next';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

const STRIPE_PAYMENT_INTENT_ID = 'PAYMENT_INTENT_ID';

export const getPaymentIntentCookie = (): string | null => {
  const cookies = parseCookies(null, {});

  if (cookies.hasOwnProperty(STRIPE_PAYMENT_INTENT_ID)) {
    const paymentIntentId = cookies[STRIPE_PAYMENT_INTENT_ID];
    return paymentIntentId;
  } else {
    console.error('No paymentintentId found in cookies');
    return null;
  }
};

export const setPaymentIntentCookie = (id: string) => {
  setCookie(null, STRIPE_PAYMENT_INTENT_ID, id, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  console.log(STRIPE_PAYMENT_INTENT_ID, id);
};

export const destroyPaymentIntentCookie = () => {
  destroyCookie(null, STRIPE_PAYMENT_INTENT_ID);
  console.log(STRIPE_PAYMENT_INTENT_ID, ' cookie destroyed');
};
