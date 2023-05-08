import React from "react";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import Imprint from "./Imprint";

export interface RouteComponentProps {
    slugs: string[];
}

export interface Route {
    name: string;
    pathname: string;
    component: React.FC<RouteComponentProps>;
}

const routes = {
    home: {
        name: 'Home',
        pathname: 'home',
        component: Home
    },
    projects: {
        name: 'Projects',
        pathname: 'projects',
        component: Projects,
    },
    contact: {
        name: 'Contact',
        pathname: 'contact',
        component: Contact,
    },
    imprint: {
        name: 'Contact',
        pathname: 'contact',
        component: Contact,
    },
}

export default routes;