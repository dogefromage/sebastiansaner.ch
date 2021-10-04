import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { lerp } from '../utils';
import { Interaction } from 'three.interaction';
import { EventRayCaster } from '../threeDomEvents';

const SceneContext = React.createContext();
const CameraContext = React.createContext();
const UpdateContext = React.createContext();

export function useScene()
{
    return useContext(SceneContext);
}

export function useCamera()
{
    return useContext(CameraContext);
}

export function useUpdate(fn, deps = [])
{
    const cb = useCallback(fn, deps);
    const updateCallbacks = useContext(UpdateContext);

    useEffect(() =>
    {
        updateCallbacks.add(cb);
        
        return () => updateCallbacks.delete(cb);
    }, [cb]);
}

export default function ThreeProvider({ children, canvas })
{
    const [ scene, setScene ] = useState();
    const camStateRef = useRef({
        target: new THREE.Vector3(0, 0, 0),
    });
    const updateCallbacks = useRef(new Set());

    useEffect(() =>
    {
        const _renderer = new THREE.WebGLRenderer({ 
            canvas,
            antialias: true,
        });
        _renderer.setSize( window.innerWidth, window.innerHeight );
        _renderer.setPixelRatio( window.devicePixelRatio );
        
        _renderer.shadowMap.enabled = true;
        _renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        const _scene = new THREE.Scene();
        setScene(_scene);

        const _camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        _camera.position.z = 3;
        _camera.position.y = 1;

        const eventCaster = new EventRayCaster(canvas, _scene, _camera);
        eventCaster.listen('click', {
            capture: true,
        });

        const _controls = new OrbitControls( _camera, _renderer.domElement );
        _controls.enableDamping = true;
        _controls.target = camStateRef.current.target;
        _controls.minDistance = 1.8;
        _controls.maxDistance = 300;

        window.addEventListener('resize', () =>
        {
            _camera.aspect = window.innerWidth / window.innerHeight;
            _camera.updateProjectionMatrix();
            _renderer.setSize( window.innerWidth, window.innerHeight );
        }, false);

        let lastTime;
        
        function animate(time)
        {
            requestAnimationFrame(animate);
            
            time *= 0.001;
            if (!lastTime)
            {
                lastTime = time;
                return;
            }

            let dt = time - lastTime;

            for (const cb of updateCallbacks.current)
            {
                cb({ time, dt });
            }

            let t = dt * 5;
            if (t > 1) t = 1;
            let deltaMove = camStateRef.current.target
                .clone().sub(_controls.target).multiplyScalar(t);
            _controls.target.add(deltaMove);
            _camera.position.add(deltaMove);

            _controls.update();

            _renderer.render(_scene, _camera);

            lastTime = time;
        }
        requestAnimationFrame(animate);
    }, []);

    return (
        <SceneContext.Provider value={scene}>
            <CameraContext.Provider value={camStateRef}>
                <UpdateContext.Provider value={updateCallbacks.current}>
                    { scene && children }
                </UpdateContext.Provider>
            </CameraContext.Provider>
        </SceneContext.Provider>
    )
}