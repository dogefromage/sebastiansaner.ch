import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize } from '../../utils/capitalize';
import { useSlugs } from '../../utils/useSlugs';
import { isMobile } from 'react-device-detect';

import styles from './BreadCrumbs.module.scss';

interface Props
{
    crumbs: {
        name: string;
        href?: string;
    }[]
}

const BreadCrumbs = ({ crumbs }: Props) =>
{
    const navigate = useNavigate();

    if (isMobile) return null;

    return (
        <div
            className={styles.wrapper}
        >
        {
            crumbs.map(slug =>
                <Link
                    className={styles.slug}
                    to={slug.href  || location.pathname}
                    key={`${slug.href}:${slug.name}`}
                >
                    { `> ${slug.name}` }
                    &nbsp;
                </Link>
            )
        }
        </div>
    );
}

export default BreadCrumbs;