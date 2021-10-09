import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { animated, useTransition, config } from 'react-spring';

let AnimatedLink = animated(Link);

function NavDesktop({ links })
{
    let transitions = useTransition(links, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 200, },
        delay: 600,
        trail: 100
    })

    return (
        <div className='nav-pc'>
            {
                transitions((style, item) =>
                    <AnimatedLink 
                        className="link-pc" 
                        to={ item.url }
                        style={style}
                    >
                        { item.title }
                    </AnimatedLink>
                )
            }
        </div>
    )
}

//https://stackoverflow.com/questions/60525928/how-to-invert-animation-order-in-react-springs-usetransitions

function NavMobile({ links })
{
    const [ show, setShow ] = useState(false);

    let transitions = useTransition(show ? links : [], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 200, },
        trail: show ? 50 : 0,
    })
    
    let iconTransition = useTransition(show, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0, display: 'none' },
        config: { duration: 200, },
    });

    const lastToggleTime = useRef(new Date().getTime());
    function toggleShow()
    {
        let time = new Date().getTime();

        if (time - lastToggleTime.current < 250) return;

        lastToggleTime.current = time;
        setShow(!show);
    }

    return (
        <div className='nav-mobile'>
            <div className="dropdown-icon">
                {
                    iconTransition((style, show) =>
                        <animated.i 
                            className={ show ? "fas fa-times" : "far fa-compass" }
                            onClick={toggleShow}   
                            style={style}
                        ></animated.i>
                    )
                }
            </div>
            {
                transitions((style, item) =>
                    <AnimatedLink
                        className="link-mobile" 
                        to={ item.url }
                        style={style}
                        onClick={ () => setShow(false) }
                    >
                        { item.title }
                    </AnimatedLink>
                )
            }
        </div>
    )
}

export default function Navigation()
{
    const [ links, setLinks ] = useState([
        { url: '/' , title: 'Home' },
        { url: '/projects' , title: 'Projects' },
        { url: '/contact' , title: 'Contact' },
    ]);

    let isMobile = useMediaQuery('(max-width: 800px)');

    return (
        <span className='nav'>
            {
                isMobile ? 
                    <NavMobile links={links} /> 
                :
                    <NavDesktop links={links} />
            }
        </span>
    )
}