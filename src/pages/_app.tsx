import * as React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import type { Theme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { themeJump } from '@/styles/themeJump';
import { themePWCC } from '@/styles/themePWCC';
import { createEmotionCache } from '@/styles/createEmotionCache';
import { Layout } from '@/layout/index';
import { SkinContext, skins } from '@/styles/skin-context';
import type { HeaderPosition } from '@/layout/components/Header/Header';
import { UserProvider } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import { ModalContextProvider } from '@/helpers/auth/ModalContext';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const Component: any = props.Component;
  // Known issue change when https://github.com/vercel/next.js/issues/36019 fixed
  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  const [skin, setSkin] = React.useState(skins.jump);
  const chosenTheme = skin === skins.pwcc ? themePWCC : themeJump;

  const headerType: Record<string, any> = {
    faqPages: 'relative',
  };
  const headerStyle: HeaderPosition = headerType[Component.layout] || 'fixed';

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      </Head>
      <ThemeProvider theme={chosenTheme}>
        <SkinContext.Provider value={{ skin, setSkin }}>
          <UserProvider>
            <CartProvider>
              <ModalContextProvider>
                <CssBaseline />
                <Layout headerPosition={headerStyle}>
                  <Component {...pageProps} />
                </Layout>
              </ModalContextProvider>
            </CartProvider>
          </UserProvider>
        </SkinContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
