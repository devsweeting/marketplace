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

  const [skin, setSkin] = React.useState(skins.pwcc);
  const choosenTheme = skin === skins.pwcc ? themePWCC : themeJump;

  const headerType: Record<string, any> = {
    faqPages: 'relative',
  };
  const headerStyle: HeaderPosition = headerType[Component.layout] || 'fixed';

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={choosenTheme}>
        <SkinContext.Provider value={{ skin, setSkin }}>
          <CssBaseline />
          <Layout headerPosition={headerStyle}>
            <Component {...pageProps} />
          </Layout>
        </SkinContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
