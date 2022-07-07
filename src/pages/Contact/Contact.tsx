import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';

import styles from './Contact.module.scss';

interface Props
{

}

const Contact = ({ }: Props) =>
{
    return (
        <>
            <BreadCrumbs 
                crumbs={[
                    {
                        name: 'Contact',
                    }
                ]}
            />
            <div
                className={styles.card}
            >
                <div
                    className={styles.links}
                >
                    <h2>Links</h2>
                    <a
                        href={'mailto:' + 'seb.sa' + '@' + 'eblcom.ch'}
                    >
                        {'seb.sa' + '@' + 'eblcom.ch'}
                    </a>
                    <a 
                        href='https://github.com/dogefromage'
                        target='_blank'
                    >
                        dogefromage
                    </a>
                    <a 
                        href='https://www.instagram.com/sebmakescomputerystuff/'
                        target='_blank'
                    >
                        sebmakescomputerystuff
                    </a>
                </div>
                <div
                    className={styles.impressum}
                >
                    <h2>Impressum</h2>
                    <p>
                        Sebastian Saner<br />
                        Rebenweg 15<br />
                        4413 Büren CH
                    </p>
                </div>
            </div>
        </>
    );
}

export default Contact;