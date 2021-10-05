import React, { useEffect } from 'react';
import { useScene } from './threeProvider';
import * as THREE from 'three';

export default function Lighting({ })
{
    const scene = useScene();

    useEffect(() =>
    {

        let ambient = new THREE.AmbientLight(0xabd7f5, 0.8);

        let lights = [
            // dirLight,
            ambient,
        ];
        
        lights.forEach(light => scene.add(light));

        return () =>
        {
            lights.forEach(light => scene.remove(light));
        }
    }, []);

    return (
        null
    )
}