import React, { useState } from 'react';
import GameCanvas from '../GameCanvas/GameCanvas';
import Routing from '../Routing/Routing';
import styles from './MainPage.module.scss';
import { useSpring, animated, config } from '@react-spring/web'
import { isMobile } from 'react-device-detect';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

const DesktopPage = () =>
{
    return (
        <ReflexContainer
            orientation='vertical'
            className={styles.reflex_page}
        >
            <ReflexElement
                className={styles.game}
                minSize={350}
                flex={0.6}
            >
                <GameCanvas />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement
                className={styles.content}
                minSize={550}
                flex={0.4}
            >
                <Routing />
            </ReflexElement>
        </ReflexContainer>
    );
}

// const DesktopPage = () =>
// {
//     const [ showText, setShowText ] = useState(false);

//     // const style = useSpring({
//     //     flexBasis: showText ? '40%' : '60%',        
//     // });

//     const style = {
//         flexBasis: '60%'
//     };

//     return (
//         <div
//             className={styles.desktop_page}
//         >
//             <animated.div
//                 className={styles.game}
//                 style={style}
//                 onMouseUp={() => setShowText(false)}
//             >
//                 <GameCanvas />
//             </animated.div>
//             <div
//                 className={styles.content}
//                 onMouseUp={() => setShowText(true)}
//             >
//                 {/* <Title /> */}
//                 <Routing />
//             </div>
//         </div>
//     );
// }

const MobilePage = () =>
{
    const [ showText, setShowText ] = useState(false);

    const style = useSpring({
        height: showText ? '25vh' : '55vh',
        config: config.default
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
                {/* <Title /> */}
                <Routing />
            </div>
        </div>
    );
}

const MainPage = () =>
{
    return isMobile ? <MobilePage /> : <DesktopPage />
}

export default MainPage;