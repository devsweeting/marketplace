# Jump frontend

This repository is the frontend application for Jump. It is built using Next.js as the main framework, and relies upon 
the [API](https://github.com/FractionalDev/jump-marketplace-api/) for data.

## Development

Please refer to the [DEVELOP.md](https://github.com/FractionalDev/jump-marketplace-api/blob/develop/DEVELOP.md)
document in the API repository for development best practices.

To compile, run `yarn` to install dependencies, and `yarn build` to confirm it compiles successfully.

### Running locally

 * Start up the API and its dependencies as outlined in its 
[README.md](https://github.com/FractionalDev/jump-marketplace-api#running-the-app).
 * Run `yarn` to install dependencies
 * Run `NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/v1 yarn dev` to run the development server
 * Navigate to `http://localhost:3000/` in your browser to view the app
