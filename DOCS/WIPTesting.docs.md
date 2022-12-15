## Front End Testing

We use Jest for frontend testing with the Testing Library. We tried out best to implement best practices for tests, based on the guidance given by Kent C. Dodds.

Only unit tests are written for the front end. We would like to have added integration and End to End tests, but we never got around to figuring out the complexities involved in writing out a system that would tie the backend and frontend together in tests.

#### Test Layout

All tests are located in the test folder and the tests follow the unit tests follow the project structure.
test

<pre>
__mocks__
__test__
  |-- api
     |-- endpoints
  |-- components
     |-- AskingPrice
     |-- AssetCard
     |-- Checkout
        |-- Cart
        |-- PaymentMethods
        |-- RetrieveUserInfo
     |-- FeaturedMarketCarousel
     |-- LoginModal
     |-- Navbar
        |-- Components
     |-- Portfolio
     |-- Verification
     |-- VerificationModel
  |-- containers
  |-- helpers
     |-- auth
     |-- hooks
  |-- pages
      |-- api
         |-- jump
  |-- utils

</pre>

### Important folders/files

##### utils

> contains helpers functions for testing.

`testRouter` is a testing utility used for the few integration tests that we have written. It allows the tests to mock router functions.

#### \_\_mocks\_\_

> contains a majority of the file mocks

`fileMock.ts` contains a mock of images  
`mockApiData.ts` contains mocks of api responses and api data in general (it my be worth reviewing the file to see if it's even worth keeping since it's been around since the begging of the project.)  
`mockApiResponse.ts` Contains mock of various api responses.  
`mockAssetResponse.ts` Contains response data for specifically the ASSETs endpoints. Including broken data to ensure error catching happens correctly.  
`mockBrands.ts` Contains mocks for various brands.  
`mockCategoryViewApiData.ts` Contains mock data for attributes. (this file should be reviewed to ensure it's still up to date).  
`mockFilters.ts` Contains mock data for the filters.

#### Mock Functions

Mocking

The apiClient should only be mocked in endpoint function tests. The method that we mocked the apiClient can be seen in the code example below.

```typescript
jest.mock('@/api/client');
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;
```

Sometimes it may be necessary to mock exported methods from a file. The easiest way we've found to do it is shown in the following code example. Where the first params of the `jest.mock` function is the location of the file and the callback function is a closure containing the methods that you need to override. This works both with internal and external modules.

```typescript
jest.mock('@/helpers/auth/UserContext', () => ({
  getCurrentUser: jest.fn().mockReturnValue({
    id: 1,
    email: 'test@example.com',
    exp: new Date('3000-01-01T00:10:00.000Z'),
  }),
  refreshUser: jest.fn().mockReturnValue(Promise.resolve()),
}));
```

Sometimes it's necessary to override a constant variable being exported by a module. The easiest way to do this is to import the constants as an object and then override the values.

```typescript
import { encrypt, decrypt } from '@/helpers/crypto';
import * as constants from '../../helpers/constants';

const mockConstants = constants as { ENCRYPTION_KEY: Buffer | undefined };

const mockEncryptionKey = (value?: string | null) => {
  if (value !== '' && !value) {
    mockConstants.ENCRYPTION_KEY = undefined;
  } else {
    mockConstants.ENCRYPTION_KEY = Buffer.from(value, 'base64');
  }
};
```

#### Testing Recommendation

The FE project is more than a simple UI, but instead it's the UI plus a backend proxy. The ApiClient is the tunnel to the jump API, and is the tunnel to any other api's that may be needed in the future. The client should be tested individually to ensure that it works correctly.

The UI portion of the front end talks to the Backend through endpoints located in `/api/endpoints/` Each of these endpoints when tested, should mock the ApiClient instead of calling the client directly.

Tests written for the UI portion of the code should mock their endpoints instead of calling the endpoints directly.

##### **Important** node-fetch in client test

node fetch needs to be imported in the client test because, jest is using its own version of Headers which cannot be redefined rather than just using fetch's headers.

## Suggested changes to tests
