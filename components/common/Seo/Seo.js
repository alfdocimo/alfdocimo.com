import Head from 'next/head';

import { getSiteMetaData } from '@utils/helpers';

export function SEO({ title, description = '', image }) {
    const siteMetadata = getSiteMetaData();

    const metaDescription = description || siteMetadata.description;

    return (
        <Head>
            <title>
                {title} | {siteMetadata.title}
            </title>
            <meta name="description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={metaDescription} />
            <meta property="og:image" content={image || 'https://alfdocimo.com/favicon.svg'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:creator" content={siteMetadata.social.twitter.handle} />

            <link rel="icon" type="image/svg" href="favicon.svg" />
            <link rel="apple-touch-icon" href="favicon.svg" />
        </Head>
    );
}
