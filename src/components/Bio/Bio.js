import clsx from 'clsx';

import { Image } from '..';
import { getSiteMetaData } from '@utils/helpers';

export function Bio({ className }) {
    const { author, social } = getSiteMetaData();

    return (
        <div className={clsx(`flex items-center`, className)}>
            <Image
                className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
                src={require('../../../content/assets/alfdocimo.jpg')}
                webpSrc={require('../../../content/assets/alfdocimo.jpg?webp')}
                previewSrc={require('../../../content/assets/alfdocimo.jpg?lqip')}
                alt="Profile picture"
            />

            <p className="text-base leading-7">
                All things javascript with a dash of <b className="font-semibold">satire.</b> A blog
                by {author.name}.{' '}
                <a href={`https://twitter.com/${social.twitter}`}>Follow me on twitter!</a>
            </p>
        </div>
    );
}
