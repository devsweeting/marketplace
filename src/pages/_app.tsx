import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import themeJump from '@/styles/themeJump';
import themePWCC from '@/styles/themePWCC';
import createEmotionCache from '@/styles/createEmotionCache';
import { Header } from '@/layout/Header';
import { Footer } from '@/layout/Footer';
import { SkinContext, skins } from '@/styles/skin-context';

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
  const [skin, setSkin] = React.useState(skins.pwcc);

  const choosenTheme = skin === skins.pwcc ? themePWCC : themeJump;

  const Component: any = props.Component;
  // Known issue change when https://github.com/vercel/next.js/issues/36019 fixed

  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={choosenTheme}>
        <SkinContext.Provider value={{ skin, setSkin }}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SkinContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
