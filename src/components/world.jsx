import React, { useState, useEffect, useRef, useContext } from 'react';
import { useScene, useUpdate, useCamera } from './threeProvider';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { useLoadingStatus } from './loadingProvider';

import StartPlanet from './planets/startPlanet';
import ContactPlanet from './planets/contactPlanet';
import ProjectsPlanet from './planets/projectsPlanet';
import NotFoundPlanet from './planets/notFoundPlanet';
import Sun from './planets/sun';

import Lighting from './lighting';

export default function World()
{
    const scene = useScene();
    scene.background = new THREE.Color(0xabd7f5);

    const startPlanet = useRef();
    const contactPlanet = useRef();
    const projectsPlanet = useRef();
    const notFoundPlanet = useRef();
    const sunRef = useRef();

    const location = useLocation();
    const path = location.pathname.toLowerCase();

    const camStateRef = useCamera();

    const loadingStatus = useLoadingStatus()

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
    }, [ path, loadingStatus ]);

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