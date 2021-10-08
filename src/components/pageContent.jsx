import React, { useState, useEffect } from 'react';
import ContentCard from './contentCard';
import { useLocation } from 'react-router-dom';
import { useTransition, a, config } from 'react-spring';
import { useIsLoading } from './loadingProvider';
import useObject from '../hooks/useObject';

function Start()
{
    return (
        <ContentCard>
            <h1>{ "<" + "Hello" + " />" } :)</h1>
            <p>\\: This is my personal page. Click on planets to explore them!</p>
        </ContentCard>
    )
}

function Projects()
{
    return (
        <ContentCard>
            <h1>{ "{ Projects }" }</h1>
            <p>
                Most of my projects (including this one) can be found on my&nbsp;
                <a href="https://github.com/dogefromage" target="_blank">
                    <i className="fab fa-github"></i>
                    &nbsp;GitHub.
                </a>
            </p>
        </ContentCard>
    )
}

function Links()
{
    return (
        <>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-github"></i>
        </>
    )
}

const copyText = (
    <>
        { 'Click to copy ' }
        <i className="far fa-copy"></i>
    </>
);

const doneText = (
    <>
        { 'Done ' }
        <i class="fas fa-check"></i> 
    </>
);


function Contact()
{

    const [ toolTip, setToolTip ] = useState(copyText)

    function onClick()
    {
        // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
        navigator.clipboard.writeText('seb.sa@eblcom.ch');

        setToolTip(doneText);
    }

    function onMouseLeave()
    {
        setTimeout(() =>
        {
            setToolTip(copyText); 
        }, 300)
    }

    return (
        <ContentCard>
            <div>
                <h1>\Contact$</h1>
            </div>
            <a className="email" 
                onClick={onClick}
                onMouseLeave={onMouseLeave}
            > 
                <span>seb.sa@eblcom.ch</span>
                <span className='tooltip'>{ toolTip }</span>
            </a>
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

    const item = useObject({ path, visible });

    const transition = useTransition(item, {
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