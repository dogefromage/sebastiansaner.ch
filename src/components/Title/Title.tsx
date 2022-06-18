import React from 'react';
import { isMobile } from 'react-device-detect';
import { joinClasses } from '../../utils/joinClasses';

import styles from './Title.module.scss';

const Title = () =>
{
    return (
        <h1
            className={joinClasses(styles.title, isMobile && styles.mobile)}
        >
            sebastiansaner
        </h1>
    );
}

export default Title;