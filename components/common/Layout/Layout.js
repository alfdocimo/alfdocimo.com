import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';
import { getSiteMetaData } from '@utils/helpers';
import {
    RiTwitterFill,
    RiGithubFill,
    RiLinkedinBoxFill,
    RiInstagramLine,
    RiYoutubeFill
} from 'react-icons/ri';

export function Layout({ children }) {
    const { author, social } = getSiteMetaData();

    return (
        <div className="w-full min-h-screen dark:bg-gray-900 dark:text-white">
            <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
                <Header />
                <main>{children}</main>
                <footer className="text-lg font-light flex align-center justify-between">
                    <span className="flex-1 text-sm">
                        © {new Date().getFullYear()}, {author.name}
                    </span>
                    <Link href={social.github.url}>
                        <a target="_blank" rel="noreferrer">
                            <RiGithubFill className="fill-current text-sky-blue dark:text-jade-green" />
                        </a>
                    </Link>
                    <Link href={social.twitter.url}>
                        <a target="_blank" rel="noreferrer">
                            <RiTwitterFill className="mx-2 fill-current text-sky-blue dark:text-jade-green" />{' '}
                        </a>
                    </Link>
                    <Link href={social.linkedin.url}>
                        <a target="_blank" rel="noreferrer">
                            <RiLinkedinBoxFill className="mx-2 fill-current text-sky-blue dark:text-jade-green" />{' '}
                        </a>
                    </Link>
                    <Link href={social.instagram.url}>
                        <a target="_blank" rel="noreferrer">
                            <RiInstagramLine className="mx-2 fill-current text-sky-blue dark:text-jade-green" />{' '}
                        </a>
                    </Link>
                    <Link href={social.youtube.url}>
                        <a target="_blank" rel="noreferrer">
                            <RiYoutubeFill className="mx-2 fill-current text-sky-blue dark:text-jade-green" />{' '}
                        </a>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

const Header = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const { pathname } = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const toggleDarkMode = (checked) => {
        const isDarkMode = checked;

        if (isDarkMode) setTheme('dark');
        else setTheme('light');
    };

    const isRoot = pathname === '/';
    const isDarkMode = resolvedTheme === 'dark';

    return (
        <header
            className={clsx('flex items-center', {
                'mb-8': isRoot,
                'mb-2': !isRoot
            })}>
            <div className={'max-w-md flex-1'}>{isRoot ? <LargeTitle /> : <SmallTitle />}</div>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/contact">
                <a className="mx-2 md:mx-8">Contact</a>
            </Link>
            {mounted && (
                <DarkModeSwitch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className={isRoot ? 28 : 24}
                />
            )}
        </header>
    );
};

const LargeTitle = () => (
    <h1>
        <Link href="/">
            <a
                className={clsx(
                    'text-3xl font-black leading-none text-black no-underline font-display',
                    'sm:text-5xl',
                    'dark:text-white'
                )}>
                alfdocimo
            </a>
        </Link>
    </h1>
);

const SmallTitle = () => (
    <h1>
        <Link href="/">
            <a
                className={clsx(
                    'text-2xl font-black text-black no-underline font-display',
                    'dark:text-white'
                )}>
                alfdocimo
            </a>
        </Link>
    </h1>
);
