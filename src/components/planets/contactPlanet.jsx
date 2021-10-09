import React, { useEffect, useRef } from 'react';
import { useScene, useUpdate } from './../threeProvider';
import * as THREE from 'three';
import { useOrbit } from './planet';
import { useHistory } from 'react-router-dom';
import { absPath } from '../../utils';

export default function ContactPlanet({ objRef })
{
    const scene = useScene();
    const history = useHistory();

    useEffect(() =>
    {
        let planet = new THREE.Mesh(
            new THREE.DodecahedronGeometry(.8, 0),
            new THREE.MeshPhongMaterial({ color: 0xd96a88 }),
        )
        planet.material.flatShading = true;

        scene.add(planet);

        objRef.current = planet;

        return () => {
            scene.remove(planet);
            planet.geometry.dispose();
        }
    }, []);

    useOrbit(objRef, 18, -0.5, .05, -0.4);

    return (
        null
    );
}