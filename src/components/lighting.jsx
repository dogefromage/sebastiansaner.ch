import React, { useEffect } from 'react';
import { useScene } from './threeProvider';
import * as THREE from 'three';

export default function Lighting()
{
    const scene = useScene();

    useEffect(() =>
    {
        // let dirLight = new THREE.DirectionalLight(0xfffebf, .6);
        // dirLight.position.set(15, 30, 15);
        // dirLight.castShadow = true;

        // const shadowWidth = 20;
        // dirLight.shadow.camera.top = shadowWidth;
        // dirLight.shadow.camera.bottom = -shadowWidth;
        // dirLight.shadow.camera.left = -shadowWidth;
        // dirLight.shadow.camera.right =shadowWidth;
        // dirLight.shadow.camera.near = 2;
        // dirLight.shadow.camera.far = 100;

        // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

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