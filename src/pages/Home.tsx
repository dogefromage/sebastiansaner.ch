import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Title from '../components/Title';
import CardDiv from '../styles/CardDiv';

interface Props {

}

const Home = ({}: Props) => {
    return (
        <>
            <BreadCrumbs
                crumbs={[
                    {
                        name: 'Home'
                    }
                ]}
            />
            <CardDiv>
                <Title />
                <p>
                    Welcome to my personal landing page. Discover the solar system by dragging or zooming. Explore different planets by traversing through the webpage.
                </p>
            </CardDiv>
        </>
    )
}

export default Home;