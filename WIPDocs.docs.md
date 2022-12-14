# Project Overview

## Architecture

Folder Structure

- src/
  - mocks
  - tests
  - api
    - client
    - endpoints
  - components
  - containers
  - domain
  - helpers
  - layout
  - pages
  - types
- styles/

## Implementations

### Checkout components

The checkout component is comprised of a series of pseudo-pages found in `Conditional.tsx;`. We use the useState hook to set the page number to determine where in the checkout flow they should land, with the Cart component being the default, followed by the payment methods modal, then by the retrieval of the user information, then the payment collection form is displayed on the next modal "page". **Payment information retrieval in `PaymentService.tsx` needs to be done in an Iframe**.

### Styling and theming

This project moved to MUI v5 with styled components, the theme is created with material's create theme, and is passed to a theme and a skin context provider at the app level. The global theme is defined in `styles/themeJump.ts`.

There are a few gotchas when using TypeScript with MUI. Adding properties to the theme palette or other properties requires you to augment the MUI interfaces for those sections. We have an example in `themeJump`. There are also loop holes to jump through when adding a property to a MUI component. We have some examples in the Button and TextField components.

MUI docs:

- [MUI](https://mui.com)
- [Theme](https://mui.com/material-ui/customization/theming/)
- [Custom theme variable](https://mui.com/material-ui/customization/theming/#custom-variables)
- [Default Theme](https://mui.com/material-ui/customization/default-theme/)
- [Additional style methods](https://mui.com/material-ui/guides/interoperability)

### useEndpoints hook

The useEndpoint hook was created to serve multiple purposes the first was to give cleanup to the fetch calls because React in strict mode in development calls the useEffect hook twice, the other is to prevent memory leaks and racing conditions. It is implemented as following:

```typescript
import { useEndpoint } from '@/helpers/hooks/useEndpoints';
const [state, LoadingState, setState] = useEndpoint(
  (signal) => apiClientEndpointCall(signal),
  [dependencies],
);
```

### useForm hook

The useForm hook was created to simplify input validations and error messages throughout the project. It returns values, if the form is valid, errors, a changeHandler to pass in on the OnChange field to take in the input values, if the input fields have been touched, and a submitHandler that you can pass your onSubmit functions to, while you pass to it your initial input values state, their validation rules as an array with your error message, and your onSubmit function.

```typescript
import { useForm } from '@/helpers/hooks/useForm';
const initialState = {
  inputValue: '',
};
const validateInputValue = (value: string) => {
  return value != null && value.trim().length > 0;
};
const validations = [
  ({ inputValue }: { inputValue: string }) =>
    validateInputValue(cardExpireDate) || {
      inputValue: `Input value must not be empty`,
    },
];
const onSubmit= async () => {
    if (isValid) {
    do Stuff
    }
  }
const { values, isValid, errors, changeHandler, touched, submitHandler } = useForm(
  initialState,
  validations,
  onSubmit,
);
```

### Api Client

All communication with the JUMP API happens through a proxy created by the Next Server. This proxy handles refresh tokens, cookie management and all communication with the Jump API.

The `ApiClient` is split into two parts `ServerApiClient` and `BrowserApiClient` with the overlap of these two clients being defined in `BaseApiClient`. None of these three methods should be called outside of `src/api/client.js`

When calling client directly the appropriate client will be created depending on whether you call `client` in the browser or on the server. The majority of the time the `browser` variant of the client will be created. This all happens in the background.

The flow of the api client can be found in this [mermaid chart](https://mermaid.live/view#pako:eNp9kU1LAzEQhv_KkJPiusVCD-6h4BeePOlJ18M0ma2xu0nMh4uU_ndnG0vpVhoIZDLvmzzDuxbSKhKVCPSVyEi617j02NUGeHmSEfxycXZ1XcB0ynt2njtgbCRoqYlgG5CtJhMr6LVRtgcdQFGjDakszu3L-fxi4W0fyN84ffdneXx4AQyBYsjasWJwodOTz9S5yVtZlg4ZL7xXeyNkJxk1op6dpuZvvg9Y9visOxzhP4QB7eiN8TwjweDh4hblinmP5dshRCE68h1qxcGsh0Yt4gd1VIuKjwr9qha12bAOU7TPP0aKKvpEhUhOYdyFuLt0aF6t5bLBNnBNSkfrn3Lw2_w3v8mFq7s)

The flow of the api client with refresh tokens can be found in this [mermaid chart](https://mermaid.live/view#pako:eNqNVF1PwjAU_Ss3fdKALCHhwT2QiL4ajfik86G0d1DZ2tl2EkP47945FmHdgCVLdttz7sc5y90yYSSymDn8KlELfFB8aXmeaOClN7rMF2gTTSE9BbdeCVVw7UFkCrUPzxfWbBzau0Ld9yAib9aoI4upRbcK73mhos8yL6L30WhEFzx3H00HddWb6XTQrhPD89P8Fbhz6F0NbkMq2nHxGPYf1bD7Vo4RFYdyfIeVopLOXZSZpWoN08JXKSiYcUF55Vn2P5SIl5eGF3SF0Q77emhPfmmmQI9Q-YZoj4gd8ndZGx_4BjXTovBgl4urye0QxmN6J9f1DWjjETJMPZgUAnU2SkuzAeUqHEhMlUZZM7tK9wp8-BeFSgZmHsIvMnA_7TnLBp169aSok1DVk_MG5nUn6_BOnBiADVmONudK0ibZVg0kzK8wx4TF9Cm5XScs0TvCVVtl_qMFi70tccjKQnLfbJ3mkPbAmzEUpjxzFKNU3tjHelP9LazdL1OypL8)

#### baseApiClient

The base api client handles all the generic fetching of data.
The methods `GET` `POST` `PUT` `PATCH` `DELETE` are defined on this base class and any addition or removal of HTTP methods should be done on this class and on `browserApiClient` and `serverApiClient`.

The abstract method `getBaseUrl` gets overridden by the classes that inherit it. This method is used to define what route the api client should be sending it's traffic to. For example `browserApiClient` has `getBaseUrl` set to `/api/jump` since this endpoint sends the code through the server side of the FE. `serverApiClient` has the `getBaseUrl` method set to return `return process.env.NEXT_PUBLIC_BACKEND_URL ?? '';` since `serverApiClient` is meant to talk directly to the Jump Backend.

#### browserApiClient

When calling the `client` the `browserApiClient` is the first pass the data goes through.
The `browserApiClient` overrides the `GET` `POST` `PUT` `PATCH` `DELETE` methods to include an optional field called `requireAuth`. The value for `requireAuth` is defaulted to be truthy. This ensures that the developer makes a conscious choice when they decided that an endpoint doesn't need authentication.

When `requireAuth` is set to true, the request locks the apiClient down to ensure that no other requests gets called (unless the request does not require auth). It then checks to see if there is a user in the request and if that user needs to refresh their auth token, If the refresh token needs refreshed then the `browserApiClient` calls the refresh token endpoint. Once the refresh token endpoint sends back a response then the original request is sent through after that any other pending requests are send as well. `AwaitLock` is the library that handles the semaphore.

```typescript
// refresh auth code
if (requireAuth) {
  await this._lock.acquireAsync();
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error(
        'Attempting to fetch an endpoint that requires auth with no current user. ' +
          'Consider adding a user check to the code that triggers this fetch.',
      );
    }

    //Check if the token is going to expire in ten seconds
    if (user.exp && user.exp.getTime() - this._TEN_SECONDS < new Date().getTime()) {
      response = await super.send('/token/refresh', 'GET', {});
      await refreshUser();
    }
  } finally {
    this._lock.release();
  }
}
```

If an api call happens before the cookies/userSession is loaded then the browser api will throw an error, unless `requireAuth` is set to false. If auth is required a good solution to this issue is to use the `useEndpoint` hook with the api request.

Once browser finishes processing the request is then forwarded on to `/api/jump`, which is the catch all endpoint for the `serverApiClient`.

NOTE: Directs requests to `/api/jump/` should almost never be called directly, except in the rare instance of a Server Side props that DO NOT require authentication and even in those situations, the apiClient should be used.

#### serverApiClient

`serverApiClient` is the last path that data takes before hitting the API Backend. This class is similar to the `base` and `browser` classes, with the main difference being that it sets up the authorization headers along with attaching some more data to the request object before it makes it's jump to the API Backend.

The `browserApiClient` overrides the `GET` `POST` `PUT` `PATCH` `DELETE` methods to include an optional field called `__allowAuthInServerSideRequest`. This optional field is included to help catch incorrect placement of api calls, by helping the developer catch which apiClient they are using. For example if the `apiClient` is called within `getServerSideProps` then the `browserApiClient` gets skipped since the window is not defined. This means that the check for refresh gets skipped as well. Which could lead to situations where a lock was placed on the browserApiClient since the refresh token needs updated, but another request is also in the processes and since it circumvents the `browserApiClient` it gets sent with an old auth token causing weird things to happen.

#### api/jump/[..params].ts

Params is a catch all endpoint. the browserApiClient goes through this endpoint before the data gets passed on to serverApiClient. This is where the data transitions from being called on the browser to being called on the Next server.

Every endpoint should pass through this endpoint. The easiest way to ensure that the data is passing through this endpoint is by simply using the `apiClient`. The only exception to this rule is the `login` endpoint and the `refresh` endpoints.

This endpoint is also where most of the API related sentry errors will be caught.

### Math and Calc helpers

The function calcValuation returns a dollar value based on the number of shares and unit price in cents. The safeParseInt.ts file includes two functions that returns either the float or integer or an undefined value instead of a NaN value.

## Known Issues

The seller's page hasn't been spec'd out to be built. Currently renders out a 404 page when visted

The checkout for sending off user details and credit card details still needs to be spec'd out.

Sell orders need to be generated so that transactions tab in the portfolio on the /account page can be made.

watchlist assets on the portfolio needs that endpoint to be updated

## Future Considerations

### Migrating to Next 13

Next released new improvements to the next image, it also made changes to the Link component where adding an <a> tag as a child is no longer required. They made changes to the script component as well as optimized fonts. They are also changing the pages directory to the app folder. Link to migration guide can be found [here](https://beta.nextjs.org/docs/upgrade-guide) and [here](https://beta.nextjs.org/docs/routing/fundamentals)

### Separate Logic into component containers and move the UI into presentation components

Currently many of the components do logical operations about the data it receives from fetch calls while also presenting the UI and styles, for scalability the logic should be done in a container parent that runs the check if the data received is null or undefined as well as render the loading and error UI if the endpoint hook returns pending, or error instead of success.
