import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { APP_TITLE, APP_DESCRIPTION, APP_IMAGE, APP_IMAGE_ALT } from './config';

type OpenGraphType = Record<string, string>;

const OpenGraph: React.FC<OpenGraphType> = ({ title, description, image, image_alt }) => {
  const { asPath } = useRouter();

  const page_url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`;
  const page_title = title || APP_TITLE;
  const page_description = description || APP_DESCRIPTION;
  const page_image = image || `${process.env.NEXT_PUBLIC_FRONTEND_URL}${APP_IMAGE}`;
  const page_image_alt = image_alt || APP_IMAGE_ALT;

  return (
    <Head>
      <title>{page_title}</title>
      <meta name="description" content={page_title} />

      {/* Facebook Meta Tags  */}
      <meta property="og:url" content={page_url} />
      <meta property="og:type" content="Website" />
      <meta property="og:title" content={page_title} />
      <meta property="og:description" content={page_description} />
      <meta property="og:image" content={page_image} />
      <meta property="og:image:secure_url" content={page_image} />
      <meta property="og:image:alt" content={page_image_alt} />

      {/* Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={page_url} />
      <meta property="twitter:url" content={page_url} />
      <meta name="twitter:title" content={page_title} />
      <meta name="twitter:description" content={page_description} />
      <meta name="twitter:image" content={page_image} />
    </Head>
  );
};

export default OpenGraph;
