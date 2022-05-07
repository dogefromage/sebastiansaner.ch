import React, { useEffect, useRef } from 'react';
import { useScene, useUpdate } from './../threeProvider';
import * as THREE from 'three';
import { orbit, rotate, setMaterial } from './planet';
import { useGltfLoader } from '../../loaders';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../loadingProvider';
import { absPath } from '../../utils';

export default function NotFoundPlanet({ objRef })
{
    const loading = useLoading();

    const scene = useScene();
    const worldRef = useRef();
    const history = useHistory();

    useEffect(() =>
    {
        loading.start();

        let loader = useGltfLoader();
        loader.load(absPath('assets/not_found_planet/not_found_planet.gltf'), (gltf) => {
            const root = gltf.scene;

            scene.add(root);
            objRef.current = root;

            let world = root.children.find(o => o.name === 'world');
            worldRef.current = world;

            let ground = world.children.find(o => o.name === 'ground');
            setMaterial(ground, new THREE.MeshPhongMaterial({
                color:0x484C68,
                shininess: 20,
            }));

            let txtLoader = new THREE.TextureLoader();

            let lava = world.children.find(child => child.name === 'lava');
            setMaterial(lava, new THREE.MeshPhongMaterial({
                map: txtLoader.load(absPath('assets/not_found_planet/lava.png')),
                emissive: 0xd1493c,
            }));

            let trees = world.children.find(child => child.name === 'trees');
            let treeTexture = txtLoader.load(absPath('assets/not_found_planet/tree.png'));
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            let rocks = world.children.find(child => child.name === 'rocks');
            let rockTexture = txtLoader.load(absPath('assets/not_found_planet/rock.png'));
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            let blackhole = world.children.find(child => child.name === 'void');
            setMaterial(blackhole, new THREE.MeshBasicMaterial({
                color: 0x000000,
            }));


            // user won't be able to click on planet => must find it by typing wrong url
            // root.addEventListener('click', (e) =>
            // {
            //     history.push('/404');
            // });

            loading.finished();
        }, (xhr) => 
        {
            // loading.status(xhr.loaded / xhr.total);
        }, (error) => {
            console.error(error);
            loading.abort();
        });

        return () => {

            /** 
             * must improve cleanup
             * textures, nested models must be also disposed
            */

            if (objRef.current)
            {
                scene.remove(objRef.current);
                objRef.current.geometry.dispose();
            }
        }
    }, []);

    useUpdate(({ dt, time }) => 
    {
        orbit(objRef.current, time, 27, 2.6, 0.002);
        rotate(worldRef.current, time, -0.02, -0.01)
    });

    return null;
}
