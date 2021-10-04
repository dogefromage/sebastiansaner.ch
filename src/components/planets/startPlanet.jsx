import React, { useEffect, useRef } from 'react';
import { useScene, useUpdate } from './../threeProvider';
import * as THREE from 'three';
import { orbit, rotate, setMaterial } from './planet';
import { useGltfLoader } from '../../loaders';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../loadingProvider';

export default function StartPlanet({ objRef })
{
    const loading = useLoading();

    const scene = useScene();
    const worldRef = useRef();
    const cloudRef = useRef();
    const history = useHistory();

    useEffect(() =>
    {
        loading.start();

        let loader = useGltfLoader();
        loader.load('assets/start_planet/start_planet.gltf', (gltf) => {
            const root = gltf.scene;

            root.traverse((o) =>
            {
                o.castShadow = true;
                o.receiveShadow = true;
            })
            scene.add(root);
            objRef.current = root;

            let clouds = root.children.find(o => o.name === 'clouds');
            cloudRef.current = clouds;
            setMaterial(clouds, new THREE.MeshPhongMaterial({
                color: 0xffffff,
                emissive: 0x555555
            }));

            let world = root.children.find(o => o.name === 'world');
            worldRef.current = world;

            let ground = world.children.find(o => o.name === 'ground');
            ground.material = new THREE.MeshPhongMaterial({
                color:0xA0E760,
                shininess: 20,
            });

            let sea = world.children.find(child => child.name === 'sea');
            sea.material = new THREE.MeshPhongMaterial({
                color:0x7392E6,
                shininess: 160,
            });

            let txtLoader = new THREE.TextureLoader();

            let trees = world.children.find(child => child.name === 'trees');
            let treeTexture = txtLoader.load( 'assets/start_planet/tree.png' );
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            let rocks = world.children.find(child => child.name === 'rocks');
            let rockTexture = txtLoader.load( 'assets/start_planet/rock.png' );
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            let dirLight = new THREE.DirectionalLight(0xfffebf, .6);
            dirLight.position.set(3, 5, 3);
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 2.5;
            dirLight.shadow.camera.bottom = -2.5;
            dirLight.shadow.camera.left = -2.5;
            dirLight.shadow.camera.right =2.5;
            dirLight.shadow.camera.near = 2.5;
            dirLight.shadow.camera.far = 10;
            dirLight.target = root;       
            dirLight.name = 'light';
            
            root.add(dirLight);

            root.addEventListener('click', (e) =>
            {
                history.push('/');
            });

            loading.finished();
        }, (xhr) => 
        {
            // loading.status(xhr.loaded / xhr.total);
        }, (error) => {
            console.log(error);
            loading.abort();
        });

        // //dummy
        // let planet = new THREE.Mesh(
        //     new THREE.DodecahedronGeometry(0, 1),
        //     new THREE.MeshBasicMaterial({ color: 0x91db8f }),
        // )
        // planet.material.flatShading = true;
        // scene.add(planet);
        // objRef.current = planet;

        return () => {
            if (objRef.current)
            {
                scene.remove(objRef.current);
                objRef.current.geometry.dispose();
            }
        }
    }, []);

    useUpdate(({ dt, time }) => 
    {
        orbit(objRef.current, time, 12, 0.5, -.03);
        rotate(worldRef.current, time, 0.1)
        rotate(cloudRef.current, time, -0.06, 0.02)
    });

    return (
        null
    );
}
