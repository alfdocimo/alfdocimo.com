import Document, { Head, Main, NextScript, Html } from 'next/document';

import { getSiteMetaData } from '@utils/helpers';

export default class MyDocument extends Document {
    render() {
        const siteMetadata = getSiteMetaData();

        return (
            <Html lang={siteMetadata.language}>
                <Head>
                    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
                    <meta name="theme-color" content="#45b5ea" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
