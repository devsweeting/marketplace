/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');
const uploadReleaseToSentry = process.env.SENTRY_CREATE_RELEASE === 'true';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // This list is required at compile time, so we can't configure this properly.
      'jumpco-assets-test.s3.us-west-2.amazonaws.com', // Test environment
      'fractionalist-nfts.s3.us-west-2.amazonaws.com', // Staging environment
      // None for production yet
    ],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  sentry: {
    disableServerWebpackPlugin: !uploadReleaseToSentry,
    disableClientWebpackPlugin: !uploadReleaseToSentry,
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  include: '.next',
  ignore: ['node_modules', 'cypress', 'test'],
  urlPrefix: '~/_next',
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

if (process.env.NODE_ENV === 'development') {
  nextConfig.images.domains.push('localhost');
  nextConfig.images.domains.push('localstack');
  nextConfig.images.domains.push('example.com');
  nextConfig.images.domains.push('placeimg.com');
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
