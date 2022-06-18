import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { capitalize } from '../../utils/capitalize';

import styles from './NotFound.module.scss';

interface Props
{
    lastUrl: string;
    lastTitle: string;
}

const synonyms = [
    'yikes', 'geez', 'blimey', 'goodness', 'gosh', 'gracious', 'heavens', 'jeepers',
];

const NotFound = ({ lastTitle, lastUrl }: Props) =>
{
    const navigate = useNavigate();

    const indexRef = useRef(
        Math.floor(Math.random() * synonyms.length)
    );

    const word = synonyms[indexRef.current];
    const title = capitalize(word) + "!";

    return (
        <div
            className={styles.card}
        >
            <Link 
                className={styles.back}
                to={lastUrl}
            >
                {"<"}
            </Link>
            <h1>{title}</h1>
            <p>
                This planet was not found. 
                <Link to={lastUrl}>
                    &nbsp;
                    { `Back to ${lastTitle}...` }
                </Link>
            </p>
        </div>
    )
}

export default NotFound;