import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { lerp } from '../utils';
import { EventRayCaster } from '../threeDomEvents';
import World from './world';
import PageContent from './pageContent';

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
    const [ isNearPlanet, setIsNearPlanet ] = useState(false);
    const camStateRef = useRef({
        target: new THREE.Vector3(0, 0, 0),
        distance: 10,
    });
    const updateCallbacks = useRef(new Set());
    const csmRef = useRef();

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
        _scene.background = new THREE.Color(0xabd7f5);
        setScene(_scene);

        const _camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 500 );
        _camera.position.z = 5;
        _camera.position.y = 1.5;
        const viewOffsetFactor = 0.85;
        _camera.setViewOffset(
            window.innerWidth, 
            window.innerHeight * viewOffsetFactor, 
            0, 0, 
            window.innerWidth, 
            window.innerHeight);

        const eventCaster = new EventRayCaster(canvas, _scene, _camera);
        eventCaster.listen('click', {
            capture: true,
        });

        const _controls = new OrbitControls( _camera, _renderer.domElement );
        _controls.enableDamping = true;
        _controls.target = camStateRef.current.target;
        _controls.minDistance = 1.8;
        _controls.maxDistance = 300;

        let dirLight = new THREE.DirectionalLight(0xfffebf, .6);
        dirLight.castShadow = true;
        const size = 10;
        const direction = new THREE.Vector3(1, 2, 1).normalize();
        dirLight.position.copy(direction).multiplyScalar(size);
        dirLight.shadow.camera.top = size;
        dirLight.shadow.camera.bottom = -size;
        dirLight.shadow.camera.left = -size;
        dirLight.shadow.camera.right = size;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 2 * size;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.name = 'dirLight';
        const lightParent = new THREE.Object3D();
        lightParent.add(dirLight);
        dirLight.target = lightParent;
        _scene.add(lightParent);

        // const helper = new THREE.CameraHelper( dirLight.shadow.camera );
        // _scene.add( helper );

        window.addEventListener('resize', () =>
        {
            _camera.aspect = window.innerWidth / window.innerHeight;
            _camera.updateProjectionMatrix();
            _renderer.setSize( window.innerWidth, window.innerHeight );
            _camera.setViewOffset(
                window.innerWidth, 
                window.innerHeight * viewOffsetFactor, 
                0, 0, 
                window.innerWidth, 
                window.innerHeight);
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
            lightParent.position.copy(_camera.position);

            _controls.update();

            let nearPlanet = _controls.getDistance() < 3;
            setIsNearPlanet(nearPlanet);

            _renderer.render(_scene, _camera);

            lastTime = time;
        }
        requestAnimationFrame(animate);
    }, []);

    return (
        <SceneContext.Provider value={scene}>
            <CameraContext.Provider value={camStateRef}>
                <UpdateContext.Provider value={updateCallbacks.current}>
                    { scene && <World /> }
                    <PageContent isNearPlanet={isNearPlanet}/>
                </UpdateContext.Provider>
            </CameraContext.Provider>
        </SceneContext.Provider>
    )
}