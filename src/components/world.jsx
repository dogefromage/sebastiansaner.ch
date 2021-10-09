import React, { useEffect, useRef } from 'react';
import { useScene, useCamera } from './threeProvider';
import { useUrl } from '../utils';
import { useIsLoading } from './loadingProvider';

import StartPlanet from './planets/startPlanet';
import ContactPlanet from './planets/contactPlanet';
import ProjectsPlanet from './planets/projectsPlanet';
import NotFoundPlanet from './planets/notFoundPlanet';
import Sun from './planets/sun';
import Lighting from './lighting';

export default function World()
{
    const camStateRef = useCamera();
    const isLoading = useIsLoading();

    const startPlanet = useRef();
    const contactPlanet = useRef();
    const projectsPlanet = useRef();
    const notFoundPlanet = useRef();
    const sunRef = useRef();

    const path = useUrl();

    useEffect(() =>
    {
        let targetPlanet = notFoundPlanet;

        switch (path)
        {
            case '/':
                targetPlanet = startPlanet;
                document.title = 'Home';
                break;
            case '/contact':
                targetPlanet = contactPlanet;
                document.title = 'Contact';
                break;
            case '/projects':
                targetPlanet = projectsPlanet;
                document.title = 'Projects';
                break;
        }

        let targetPosition = targetPlanet.current?.position;
        if (!targetPosition) return;
        camStateRef.current.target = targetPosition;
    }, [ path, isLoading ]);

    return (
        <>
            <StartPlanet objRef={startPlanet}/>
            <ContactPlanet objRef={contactPlanet}/>
            <ProjectsPlanet objRef={projectsPlanet}/>
            <NotFoundPlanet objRef={notFoundPlanet}/>
            <Sun objRef={sunRef}/>
            <Lighting />
        </>
    );
}