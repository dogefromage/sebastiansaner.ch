import React, { useEffect, useRef } from 'react';
import { useScene, useUpdate } from './../threeProvider';
import * as THREE from 'three';
import { useOrbit } from './planet';

export default function NotFoundPlanet({ objRef })
{
    const scene = useScene();

    useEffect(() =>
    {
        let planet = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1.2, 2),
            new THREE.MeshPhongMaterial({ color: 0x400470 }),
        )
        planet.material.flatShading = true;

        scene.add(planet);

        objRef.current = planet;

        return () => {
            scene.remove(planet);
            planet.geometry.dispose();
        }
    }, []);

    useOrbit(objRef, 27, 2.6, 0.05, -0.8);

    return (
        null
    );
}