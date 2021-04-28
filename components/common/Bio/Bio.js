import clsx from 'clsx';

import { Image } from '..';
import { getSiteMetaData } from '@utils/helpers';

export function Bio({ className }) {
    const { description, social } = getSiteMetaData();

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
                {description}{' '}
                <a href={social.twitter.url} target="_blank" rel="noreferrer">
                    Follow me on twitter,
                </a>{' '}
                <a href={social.youtube.url} target="_blank" rel="noreferrer">
                    and check out my YouTube channel!
                </a>
            </p>
        </div>
    );
}
