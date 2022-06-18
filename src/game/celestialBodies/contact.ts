import { Game } from "../Game";
import { Planet } from "../Planet";
import { CONTACT_POS, CONTACT_SELF_AXIS, CONTACT_SELF_SPEED, CONTACT_VEL } from "../utils/constants";
import * as THREE from 'three';
import gltfLoader from "../utils/gltfLoader";
import { setMaterial } from "../../utils/setMaterial";

export class ContactPlanet extends Planet
{
    private parent: THREE.Object3D;
    private updateParent?: (dt: number) => void;

    constructor(game: Game)
    {
        super(
            game,
            CONTACT_POS,
            CONTACT_VEL,
        );
        
        const dummyObject = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 8),
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
            })
        );

        this.parent = new THREE.Object3D();
        this.parent.name = 'Contact Planet';
        this.parent.scale.multiplyScalar(0.6);
        this.parent.add(dummyObject);
        game.scene.add(this.parent);

        this.parent.addEventListener('click', (e) =>
        {
            // console.log('clicked on contact', e);
        });

        gltfLoader.load('/assets/contact_planet/contact_planet.gltf', gltf => 
        {
            const root = gltf.scene;

            const world = root.children.find(o => o.name === '_world')!;

            const ground = world.children.find(o => o.name === 'ground')!;
            setMaterial(ground, new THREE.MeshPhongMaterial({
                color: 0xeeeeee,
                emissive: 0xffffff,
                emissiveIntensity: 0.1,
                shininess: 10,
            }));

            const ice = world.children.find(child => child.name === 'ice')!;
            setMaterial(ice, new THREE.MeshPhongMaterial({
                color:0xb8f5ff,
                shininess: 160,
            }));

            const txtLoader = new THREE.TextureLoader();

            const trees = world.children.find(child => child.name === '_trees')!;
            const treeTexture = txtLoader.load('/assets/contact_planet/tree_cold.png');
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            const rocks = world.children.find(child => child.name === '_rocks')!;
            const rockTexture = txtLoader.load('/assets/contact_planet/rocks_green.png');
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            this.parent.remove(dummyObject);
            this.parent.add(root);

            root.updateMatrixWorld();

        }, undefined, console.error);

        const points = this.calculateLine(1.2, 200);

        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineDashedMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.5,
                linewidth: 1,
                dashSize: 0.4,
                gapSize: 0.2,
            }),
        ).computeLineDistances();
        
        game.scene.add(line);
    }

    update(dt: number)
    {
        this.parent.rotateOnAxis(CONTACT_SELF_AXIS, CONTACT_SELF_SPEED * dt);

        this.newton(dt);

        this.parent.position.copy(this.position);

        this.updateParent?.(dt);
    }
}
