import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Title from '../../components/Title/Title';

import styles from './Home.module.scss';

interface Props
{

}

const Home = ({ }: Props) =>
{
    return (
        <>
            <BreadCrumbs
                crumbs={[
                    {
                        name: 'Home'
                    }
                ]}
            />
            <div
                className={styles.card}
            >
                <Title />
                <p>
                    Welcome to my personal landing page. Discover the solar system by dragging or zooming. Explore different planets by traversing through the webpage.
                </p>
            </div>
        </>
    )
}

export default Home;