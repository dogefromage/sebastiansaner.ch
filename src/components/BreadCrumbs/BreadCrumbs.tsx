import React from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../../utils/capitalize';
import { useSlugs } from '../../utils/useSlugs';

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
    // const slugs = useSlugs();
    const navigate = useNavigate();

    return (
        <div
            className={styles.wrapper}
        >
        {
            crumbs.map(slug =>
                <a
                    className={styles.slug}
                    onClick={e => 
                    {
                        e.preventDefault();
                        
                        if (slug.href) navigate(slug.href);
                    }}
                >
                    { `> ${slug.name}` }
                    &nbsp;
                </a>
            )
        }
        </div>
    );
}

export default BreadCrumbs;