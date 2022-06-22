import { removeUndefinedProps } from '@/helpers/removeUndefinedProps';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';

const mocKContext = {} as GetServerSidePropsContext;

describe('removeUndefinedProps', () => {
  test('should remove undefined keys', async () => {
    const mockHandler: GetServerSideProps = async () => {
      return {
        props: {
          undefinedKey: undefined,
          stringKey: 'string',
          nestedKey: {
            undefinedKey: undefined,
            stringKey: 'string',
          },
        },
      };
    };
    const result = await removeUndefinedProps(mockHandler)(mocKContext);

    if (!('props' in result)) {
      throw new Error('no props in GetServerSideProps result object');
    }

    expect(result.props).not.toHaveProperty('undefinedKey');
    expect(result.props).toHaveProperty('stringKey');

    expect(result.props).not.toHaveProperty('nestedKey.undefinedKey');
    expect(result.props).toHaveProperty('nestedKey.stringKey');
  });

  test('should remove undefined keys in async props', async () => {
    const mockHandlerWithAsyncProps: GetServerSideProps = async () => {
      return {
        props: Promise.resolve({
          undefinedKey: undefined,
          stringKey: 'string',
          nestedKey: {
            undefinedKey: undefined,
            stringKey: 'string',
          },
        }),
      };
    };
    const result = await removeUndefinedProps(mockHandlerWithAsyncProps)(mocKContext);

    if (!('props' in result)) {
      throw new Error('no props in GetServerSideProps result object');
    }

    expect(result.props).not.toHaveProperty('undefinedKey');
    expect(result.props).toHaveProperty('stringKey');

    expect(result.props).not.toHaveProperty('nestedKey.undefinedKey');
    expect(result.props).toHaveProperty('nestedKey.stringKey');
  });
});
