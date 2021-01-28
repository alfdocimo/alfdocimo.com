import { ThemeProvider } from 'next-themes';
import { FormspreeProvider } from '@formspree/react';

import '@assets/main.css';

import 'typeface-open-sans';
import 'typeface-merriweather';

export default function MyApp({ Component, pageProps }) {
    return (
        <FormspreeProvider project={process.env.FORMSPREE_PROJECT_ID}>
            <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </FormspreeProvider>
    );
}
