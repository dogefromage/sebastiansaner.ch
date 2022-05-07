import React, { useState } from 'react';
import GameCanvas from '../GameCanvas/GameCanvas';
import Routing from '../Routing/Routing';
import styles from './Page.module.scss';
import { useSpring, animated } from 'react-spring'
import { isMobile } from 'react-device-detect';

const DesktopPage = () =>
{
    const [ showText, setShowText ] = useState(false);

    const style = useSpring({
        flexBasis: showText ? '40%' : '60%',        
    });

    return (
        <div
            className={styles.desktop_page}
        >
            <animated.div
                className={styles.game}
                style={style}
                onMouseDown={() => setShowText(false)}
            >
                <GameCanvas />
            </animated.div>
            <div
                className={styles.content}
                onMouseDown={() => setShowText(true)}
            >
                <Routing />
            </div>
        </div>
    );
}

const MobilePage = () =>
{
    const [ showText, setShowText ] = useState(false);

    const style = useSpring({
        height: showText ? '25vh' : '55vh',        
    });

    return (
        <div
            className={styles.mobile_page}
        >
            <animated.div
                className={styles.game}
                style={style}
            >
                <GameCanvas />
            </animated.div>
            <div
                className={styles.content}
                onScroll={e =>
                {
                    const div = e.target as HTMLDivElement;

                    setShowText(div.scrollTop > 10)
                }}
            >
                <Routing />
            </div>
        </div>
    );
}

const Page = () =>
{
    return isMobile ? <MobilePage /> : <DesktopPage />
}

export default Page;