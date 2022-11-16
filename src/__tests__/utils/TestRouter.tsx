import React from 'react';
import type { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

type Props = {
  router: Partial<NextRouter>;
  children: JSX.Element;
};

export function TestRouter({ router, children }: Props) {
  const {
    route = '',
    pathname = '',
    query = {},
    asPath = '',
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
    basePath = '/',
    isLocaleDomain = false,
    isReady = false,
    isPreview = false,
  } = router;

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        isFallback,
        events,
        basePath,
        isLocaleDomain,
        isReady,
        isPreview,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}
