import { withSentry } from '@sentry/nextjs';

const handler = async () => {
  throw new Error('Test Error API hit');
};
export const config = {
  api: {
    externalResolver: true,
  },
};

export default withSentry(handler);
