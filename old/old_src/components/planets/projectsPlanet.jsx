import React, { useEffect, useRef } from 'react';
import { useScene, useUpdate } from './../threeProvider';
import * as THREE from 'three';
import { orbit, rotate, setMaterial } from './planet';
import { useGltfLoader } from '../../loaders';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../loadingProvider';
import { absPath } from '../../utils';

export default function ProjectsPlanet({ objRef })
{
    const scene = useScene();
    const worldRef = useRef();
    const history = useHistory();
    const loading = useLoading();

    useEffect(() =>
    {
        loading.start();

        let loader = useGltfLoader();
        loader.load(absPath('assets/projects_planet/projects_planet.gltf'), (gltf) => {
            const root = gltf.scene;

            root.traverse((o) =>
            {
                o.castShadow = true;
                o.receiveShadow = true;
            })
            scene.add(root);
            objRef.current = root;

            let world = root.children.find(o => o.name === 'world');
            worldRef.current = world;

            let ground = world.children.find(o => o.name === 'ground');
            ground.material = new THREE.MeshPhongMaterial({
                color:0xFFE889,
                shininess: 10,
            });

            let sea = world.children.find(child => child.name === 'sea');
            sea.material = new THREE.MeshPhongMaterial({
                color:0x38A1E7,
                shininess: 160,
            });

            let txtLoader = new THREE.TextureLoader();

            let trees = world.children.find(child => child.name === 'trees');
            let treeTexture = txtLoader.load(absPath('assets/projects_planet/tree.png'));
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            let rocks = world.children.find(child => child.name === 'rocks');
            let rockTexture = txtLoader.load(absPath('assets/projects_planet/rock.png'));
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            let pyramids = world.children.find(child => child.name === 'pyramids');
            let pyramidsTexture = txtLoader.load(absPath('assets/projects_planet/pyramid.png'));
            setMaterial(pyramids, new THREE.MeshPhongMaterial({
                map: pyramidsTexture
            }));

            // let dirLight = new THREE.DirectionalLight(0xfffebf, .6);
            // dirLight.position.set(3, 5, 3);
            // dirLight.castShadow = true;
            // dirLight.shadow.camera.top = 2.5;
            // dirLight.shadow.camera.bottom = -2.5;
            // dirLight.shadow.camera.left = -2.5;
            // dirLight.shadow.camera.right =2.5;
            // dirLight.shadow.camera.near = 2.5;
            // dirLight.shadow.camera.far = 10;
            // dirLight.target = root;       
            // dirLight.name = 'light';
            // root.add(dirLight);

            root.addEventListener('click', (e) =>
            {
                history.push('/projects');
            });


            loading.finished();
        }, (xhr) => 
        {
            // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        }, (error) => {
            console.log(error);
            loading.abort();
        });

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
        orbit(objRef.current, time, 15, 0.9, -.01);
        rotate(worldRef.current, time, -0.02, -0.06)
    });

    return (
        null
    );
}
