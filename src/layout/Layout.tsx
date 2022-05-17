import React from 'react';
import Head from 'next/head';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Jump website</title>
        <meta name="description" content="NFT market webisit" />

        {/* Facebook Meta Tags  */}
        <meta
          property="og:url"
          content="https://staging.jump.co/token-detail/82191303-fa4d-4168-9cc8-96d82a291975/2019-panini-mosaic-pink-camo-rj-barrett-rookie-270-psa-10-gem-mint/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jump website" />
        <meta property="og:description" content="NFT market webisit" />
        <meta property="og:image" content="https://staging.jump.co/images/logoPWCC.svg" />

        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staging.jump.co" />
        <meta
          property="twitter:url"
          content="https://staging.jump.co/token-detail/82191303-fa4d-4168-9cc8-96d82a291975/2019-panini-mosaic-pink-camo-rj-barrett-rookie-270-psa-10-gem-mint/"
        />
        <meta name="twitter:title" content="Jump website" />
        <meta name="twitter:description" content="NFT market webisit" />
        <meta name="twitter:image" content="https://staging.jump.co/images/logoPWCC.svg" />
      </Head>

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
