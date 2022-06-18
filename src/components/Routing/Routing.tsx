import { animated, useSprings, useTransition } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import NotFound from '../../pages/NotFound/NotFound';
import routes, { Route } from '../../pages/routes';
import { joinClasses } from '../../utils/joinClasses';
import { useSlugs } from '../../utils/useSlugs';
import styles from './Routing.module.scss';

const ROUTE_GAP = 6;
const ROUTE_WIDTHS: number[] = [];

for (let i = 0; i < routes.length; i++)
{
    let width = routes[i].name.length + ROUTE_GAP;

    ROUTE_WIDTHS.push(width);
}

interface Props
{

}

const Routing = ({ }: Props) =>
{
    const navigate = useNavigate();

    function selectRoute(index: number)
    {
        const wrappedIndex = (index + routes.length) % routes.length;
        const nextRoute = routes[wrappedIndex];
        navigate(nextRoute.pathname);
    }
    
    const slugs = useSlugs();
    const slug = slugs[0] || '';

    const routeIndex = routes.findIndex(route => route.pathname === slug);

    const remainingSlugs = slugs.slice(1);

    const springs = useSprings(
        routes.length,
        routes.map((route, index) => 
        {
            let offset = 100 * (index - routeIndex);

            const isCenter = index - routeIndex === 0;

            return {
                x: `calc(${offset}vw)`,
                opacity: isCenter ? 1 : 0,
            };
        })
    );
    
    const [ showSwipeTip, setShowSwipeTip ] = useState(isMobile)

    const route: Route | undefined = routes[routeIndex];

    useEffect(() =>
    {
        if (!route) navigate('not-found');
    }, [ route ]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => 
        {
            selectRoute(routeIndex + 1);
            setShowSwipeTip(false);
        },
        onSwipedRight: () => 
        {
            selectRoute(routeIndex - 1);
            setShowSwipeTip(false);
        }
    });

    const RouteComponent = route?.component;

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.router}
                {...swipeHandlers}
            >
                {
                    showSwipeTip &&
                    <div
                        className={styles.swipeTip}
                    >
                        swipe...
                    </div>
                }
                {
                    routes.map((route, index) =>
                    {
                        const { opacity, x } = springs[index];

                        const divStyle = isMobile ? { x } : {};

                        return (
                            <animated.div
                                className={joinClasses(styles.routes, isMobile && styles.mobile_route)}
                                onClick={() => 
                                {
                                    if (index !== routeIndex) selectRoute(index);
                                }}
                                style={divStyle}
                                key={route.pathname}
                            >
                                <animated.a
                                    style={{
                                        opacity,
                                    }}
                                    className={styles.bracket_left}
                                    onClick={() => 
                                    {
                                        if (index === routeIndex) selectRoute(routeIndex - 1);
                                    }}
                                >
                                    {"<"}
                                </animated.a>
                                &nbsp;
                                <animated.p
                                    style={{
                                        opacity: opacity.to([0, 1], [0.2, 1]),
                                    }}
                                >
                                    { route.name }
                                </animated.p>
                                &nbsp;
                                <animated.a
                                    style={{
                                        opacity,
                                    }}
                                    className={styles.bracket_right}
                                    onClick={() => 
                                    {
                                        if (index === routeIndex) selectRoute(routeIndex + 1);
                                    }}
                                    >
                                    {"/>"}
                                </animated.a>
                                &nbsp;
                            </animated.div>
                        );
                    })
                }
            </div>
            {
                RouteComponent ? (
                    <RouteComponent slugs={remainingSlugs}/>
                ) : (
                    <NotFound 
                        lastTitle='Home'
                        lastUrl='/'
                    />
                ) 
            }
        </div>
    ) 
    
}

export default Routing;