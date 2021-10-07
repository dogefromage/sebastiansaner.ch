import React, { useState, useEffect } from 'react';
import ContentCard from './contentCard';
import { useLocation } from 'react-router-dom';
import { useTransition, a, config } from 'react-spring';
import { useIsLoading } from './loadingProvider';

function Start()
{
    return (
        <ContentCard>
            <h1>Hello :)</h1>
            <p>This is my personal page. You can click on planets to explore them.</p>
        </ContentCard>
    )
}

function Projects()
{
    return (
        <ContentCard>
            <h1>Projects</h1>
        </ContentCard>
    )
}

function Contact()
{
    return (
        <ContentCard>
            <h1>Contact</h1>
        </ContentCard>
    )
}

function Switch({ path })
{
    switch (path)
    {
        case '/':           return <Start />
        case '/contact':    return <Contact />
        case '/projects':   return <Projects />
    }
    return null;
}

export default function Pagecontent({ isNearPlanet })
{
    const [ waiting, setWaiting ] = useState(true);

    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const isLoading = useIsLoading();

    useEffect(() =>
    {
        setTimeout(() =>
        {
            setWaiting(false);
        }, 1000);
    }, []);

    const visible = !waiting && !isLoading && !isNearPlanet

    const transition = useTransition({ path, visible }, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.gentle,
    });

    return transition((styles, { path, visible }) =>
        visible && 
        <a.div className='content-wrapper' style={styles}>
            <Switch path={path} />
        </a.div>
    );
}