import type { GetServerSideProps } from 'next';

/**
 * Next does not like any undefined keys in getServerSideProps or getStaticProps.
 * This is a function that will remove any undefined keys before serialization
 */
export const removeUndefinedProps = <T extends GetServerSideProps>(handler: T): T => {
  return (async (context) => {
    const result = await handler(context);

    if ('props' in result) {
      const props = await result.props;

      removeUndefinedKeys(props);

      result.props = props;
    }

    return result;
  }) as T;
};

const removeUndefinedKeys = (obj: Record<string, unknown>): void => {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'undefined') {
      delete obj[key];
      continue;
    }

    if (typeof obj[key] === 'object') {
      removeUndefinedKeys(obj[key] as Record<string, unknown>);
    }
  }
};
