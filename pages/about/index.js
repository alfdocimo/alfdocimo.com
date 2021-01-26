import fs from 'fs';
import clsx from 'clsx';

import { Layout, SEO } from '@components/common';
import Coder from '@components/common/undraw/Coder';
import ReactMarkdown from 'react-markdown/with-html';

export default function About({ markdown }) {
    return (
        <Layout>
            <SEO title="About" />

            <h1
                className={clsx(
                    'text-3xl font-black leading-none text-black no-underline font-display',
                    'sm:text-5xl',
                    'dark:text-white',
                    'my-16 text-center'
                )}>
                A bit about me
            </h1>
            <Coder />

            <ReactMarkdown
                className="my-16 prose lg:prose-lg dark:prose-dark"
                escapeHtml={false}
                source={markdown}
            />
        </Layout>
    );
}

export async function getStaticProps() {
    const markdown = fs.readFileSync(`pages/about/content.md`).toString();

    return { props: { markdown } };
}
