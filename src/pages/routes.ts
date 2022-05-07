import React from "react";
import { getToPathname } from "react-router/lib/router";
import About from "./About/About";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import Projects from "./Projects/Projects";

interface RouteComponentProps
{
    slugs: string[];
}

interface Route
{
    name: string;
    pathname: string;
    component: React.FC<RouteComponentProps>;
}

const routes: Route[] = 
[
    {
        name: 'Home',
        pathname: '',
        component: Home
    },
    {
        name: 'Projects',
        pathname: 'projects',
        component: Projects,
    },
    {
        name: 'About',
        pathname: 'about',
        component: About,
    }
];

export const notFoundRoute: Route =
{
    name: 'Not Found',
    pathname: '404',
    component: NotFound,
}

export default routes;