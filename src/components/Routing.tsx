import { animated, useSprings } from '@react-spring/web';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { styled } from 'styled-components';
import NotFound from '../pages/NotFound';
import routes, { Route } from '../pages/routes';
import { useSlugs } from '../utils/useSlugs';
import Layout from './Layout';

const navigationRoutes = [
    routes.home,
    routes.projects,
    routes.contact,
]

interface Props {

}

const Routing = ({}: Props) => {
    const navigate = useNavigate();

    const slugs = useSlugs();
    const firstSlug = slugs[0] || '';
    const remainingSlugs = slugs.slice(1);

    const routeIndex = navigationRoutes.findIndex(route => route.pathname === firstSlug);

    const selectRoute = (index: number) => {
        const nextRoute = navigationRoutes[index];
        navigate(nextRoute.pathname);
    }

    const RouteComponent = routes[firstSlug]?.component;

    return (
        <Layout>
            {
                isMobile ? (
                    <MobileNavbar routeIndex={routeIndex} selectRoute={selectRoute} />
                ) : (
                    <DesktopNavbar routeIndex={routeIndex} selectRoute={selectRoute} />
                )
            }
            {
                RouteComponent ? (
                    <RouteComponent slugs={remainingSlugs} />
                ) : (
                    <NotFound
                        lastTitle='Home'
                        lastUrl='/'
                    />
                )
            }
        </Layout >
    )
}

export default Routing;


interface NavProps {
    routeIndex: number;
    selectRoute: (index: number) => void;
}

const MobileNavbar = ({ routeIndex, selectRoute }: NavProps) => {

    const offsetRoute = (offset: number) =>
        selectRoute((routeIndex + offset + navigationRoutes.length) % navigationRoutes.length);

    const springs = useSprings(
        navigationRoutes.length,
        navigationRoutes.map((route, index) => {
            let offset = 100 * (index - routeIndex);

            const isCenter = index - routeIndex === 0;

            return {
                x: `calc(${offset}vw)`,
                opacity: isCenter ? 1 : 0,
            };
        })
    );

    const [showSwipeTip, setShowSwipeTip] = useState(isMobile)

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            offsetRoute(+1);
            setShowSwipeTip(false);
        },
        onSwipedRight: () => {
            offsetRoute(-1);
            setShowSwipeTip(false);
        }
    });

    return (
        <NavbarDiv
            {...swipeHandlers}
        >
            {
                showSwipeTip &&
                <div
                    className={'swipe_tip'}
                >
                    swipe...
                </div>
            }
            {
                navigationRoutes.map((route, index) => {
                    const { opacity, x } = springs[index];
                    const divStyle = isMobile ? { x } : {};

                    return (
                        <animated.div
                            className={'route mobile_route'}
                            onClick={() => {
                                if (index !== routeIndex) selectRoute(index);
                            }}
                            style={divStyle}
                            key={route.pathname}
                        >
                            <a
                                className={'bracket_left'}
                                onClick={() => {
                                    if (index === routeIndex) offsetRoute(-1);
                                }}
                            >
                                {"<"}
                            </a>
                            &nbsp;
                            <p>{route.name}</p>
                            &nbsp;
                            <a
                                className={'bracket_right'}
                                onClick={() => {
                                    if (index === routeIndex) offsetRoute(+1);
                                }}
                            >
                                {"/>"}
                            </a>
                            &nbsp;
                        </animated.div>
                    );
                })
            }
        </NavbarDiv>
    )
}

const DesktopNavbar = ({ routeIndex, selectRoute }: NavProps) => {

    const springs = useSprings(
        navigationRoutes.length,
        navigationRoutes.map((route, index) => {
            const isCenter = index - routeIndex === 0;
            return {
                opacity: isCenter ? 1 : 0,
            };
        })
    );

    return (
        <NavbarDiv>
            {
                navigationRoutes.map((route, index) => {
                    const { opacity } = springs[index];
                    return (
                        <animated.div
                            className={'route'}
                            onClick={() => {
                                if (index !== routeIndex) selectRoute(index);
                            }}
                            key={route.pathname}
                        >
                            <animated.a
                                style={{
                                    opacity,
                                }}
                                className={'bracket_left'}
                            >
                                {"<"}
                            </animated.a>
                            &nbsp;
                            <animated.p
                                style={{
                                    opacity: opacity.to([0, 1], [0.2, 1]),
                                }}
                            >
                                {route.name}
                            </animated.p>
                            &nbsp;
                            <animated.a
                                style={{
                                    opacity,
                                }}
                                className={'bracket_right'}
                            >
                                {"/>"}
                            </animated.a>
                            &nbsp;
                        </animated.div>
                    );
                })
            }
        </NavbarDiv>
    );
}

const NavbarDiv = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: flex;

    font-family: monospace;
    user-select: none;
    font-size: 1.6rem;
    font-weight: bold;

    /* outline: solid 1px red; */

    .route {
        height: 100%;

        transform: translateX(-2ch);
        display: flex;
        align-items: center;

        cursor: pointer;
        a, p {
            margin: 0;
            padding: 0;
        }

        &.mobile_route {
            position: absolute;
            left: 0;
        }
    }

    .swipe_tip {
        position: absolute;
        right: 2ch;
        
        color: #00000055;
        opacity: 0;

        animation-name: swipeAnimation;
        animation-direction: alternate;
        animation-duration: 2s;
        animation-delay: 4s;
        animation-iteration-count: 3;
    }
`