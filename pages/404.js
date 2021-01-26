import Link from 'next/link';
import clsx from 'clsx';

import { Layout, SEO } from '@components/common';
import NotFound from '@components/common/undraw/NotFound';

export default function Custom404() {
    return (
        <Layout>
            <SEO title="404 Not Found" />
            <div className="mt-20 flex flex-col items-center justify-center">
                <Link href="/">
                    <a
                        className={clsx(
                            'text-3xl font-black leading-none text-black no-underline font-display',
                            'sm:text-5xl',
                            'dark:text-white',
                            'mb-20'
                        )}>
                        Go back?
                    </a>
                </Link>
                <NotFound />
            </div>
        </Layout>
    );
}
