# Jump frontend

This repository is the frontend application for Jump. It is built using Next.js as the main framework, and relies upon
the [API](https://github.com/FractionalDev/jump-marketplace-api/) for data.

## Development

Please refer to the [DEVELOP.md](https://github.com/FractionalDev/jump-marketplace-api/blob/develop/DEVELOP.md)
document in the API repository for development best practices.

To compile, run `yarn` to install dependencies, and `yarn build` to confirm it compiles successfully.

### Running locally

- Start up the API and its dependencies as outlined in its
  [README.md](https://github.com/FractionalDev/jump-marketplace-api#running-the-app).
- Run `yarn` to install dependencies
- Generate an encryption key and save it in the `ENCRYPTION_KEY` variable in `.env.local`
  - You can generate a key in your terminal with the following command
  - `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- Run `yarn dev` to run the development server
- Navigate to `http://localhost:3000/` in your browser to view the app

### Setting up sentry

- set the `NEXT_PUBLIC_SENTRY_DSN` to be your dsn, this info can be found here [docs.sentry.io](https://docs.sentry.io/product/sentry-basics/dsn-explainer/)
