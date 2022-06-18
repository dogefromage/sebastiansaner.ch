import React from "react";
import Contact from "./Contact/Contact";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";

interface RouteComponentProps
{
    slugs: string[];
}

export interface Route
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
    // {
    //     name: 'Blog',
    //     pathname: 'blog',
    //     component: Blog,
    // },
    {
        name: 'Contact',
        pathname: 'contact',
        component: Contact,
    }
];

export default routes;