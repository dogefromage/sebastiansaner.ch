import React, { useEffect, useRef } from 'react';
import { useScene, useUpdate } from './../threeProvider';
import * as THREE from 'three';
import { useOrbit } from './planet';

export default function Sun({ objRef })
{
    const scene = useScene();

    useEffect(() =>
    {
        let planet = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1.5, 1),
            new THREE.MeshStandardMaterial({ 
                color: 0xfce303, 
                emissive: 0xb7a500
            }),
        )
        planet.material.flatShading = true;
        planet.castShadow = true;
        planet.receiveShadow = true;

        scene.add(planet);

        objRef.current = planet;

        return () => {
            scene.remove(planet);
            planet.geometry.dispose();
        }
    }, []);

    useOrbit(objRef, 0, 0, 0, -0.4);

    return (
        null
    );
}
