import * as THREE from "three";
import { Game } from "../Game";
import { GameObject } from "../GameObject";
import { SUN_SELF_AXIS, SUN_SELF_SPEED } from "../utils/constants";
import gltfLoader from "../utils/gltfLoader";



export class Sun extends GameObject
{
    private sun: THREE.Object3D;

    constructor(game: Game)
    {
        super(game);
        
        const dummyObject = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 8),
            new THREE.MeshPhongMaterial({
                color: 0xffd53d,
                emissive: 0xffd53d,
                // emissiveIntensity: 1.5,
            })
        );

        this.sun = new THREE.Object3D();
        this.sun.add(dummyObject);
        this.sun.name = 'Sun';
        game.scene.add(this.sun);

        gltfLoader.load('/assets/sun/sun.gltf', gltf => 
        {
            const root = gltf.scene;
    
            const outer = root.children.find(o => o.name === 'outer');
            if (outer instanceof THREE.Mesh)
            {
                outer.material = new THREE.MeshStandardMaterial({
                    color: 0xf5c269,
                    emissive: 0xf5c269,
                    emissiveIntensity: 0.7,
                    side: THREE.DoubleSide,
                });
            }

            const inner = root.children.find(o => o.name === 'inner');
            if (inner instanceof THREE.Mesh)
            {
                inner.material = new THREE.MeshStandardMaterial({
                    color: 0xff9b3d,
                    emissive: 0xff9b3d,
                    emissiveIntensity: 0.7,
                    side: THREE.DoubleSide,
                });
            }

            this.sun.remove(dummyObject);
            this.sun.add(root);

        }, undefined, console.error);
    }

    update(dt: number)
    {
        this.sun.rotateOnAxis(SUN_SELF_AXIS, SUN_SELF_SPEED * dt);
    }
}