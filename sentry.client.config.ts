// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_SENTRY_ENV || 'development';
const SENTRY_SAMPLE_RATE =
  process.env.SENTRY_SAMPLE_RATE || process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE || '1.0';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: parseFloat(SENTRY_SAMPLE_RATE),
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
    environment: SENTRY_ENV,
    integrations: [new BrowserTracing()],
  });
}
