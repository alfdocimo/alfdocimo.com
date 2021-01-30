import clsx from 'clsx';

import { Layout, SEO } from '@components/common';
import ContactForm from '@components/common/ContactForm';

export default function Contact() {
    return (
        <Layout>
            <SEO title="Contact | Think we can collab? Hit me up!" />

            <h1
                className={clsx(
                    'text-3xl font-black leading-none text-black no-underline font-display',
                    'sm:text-5xl',
                    'dark:text-white',
                    'my-16 text-center'
                )}>
                Lets get in touch
            </h1>
            <div className="my-16">
                <ContactForm />
            </div>
        </Layout>
    );
}
