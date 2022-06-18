import * as THREE from 'three';
import { setMaterial } from "../../utils/setMaterial";
import { Game } from "../Game";
import { Planet } from "../Planet";
import { HOME_POS, HOME_SELF_AXIS, HOME_SELF_SPEED, HOME_VEL } from "../utils/constants";
import gltfLoader from "../utils/gltfLoader";

export class HomePlanet extends Planet
{
    private parent: THREE.Object3D;
    private updateParent?: (dt: number) => void;

    constructor(game: Game)
    {
        super(
            game,
            HOME_POS,
            HOME_VEL,
        );
        
        const dummyObject = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 8),
            new THREE.MeshPhongMaterial({
                color: 0x8ce366,
            })
        );

        this.parent = new THREE.Object3D();
        this.parent.name = 'Home Planet';
        this.parent.scale.multiplyScalar(0.6);
        this.parent.add(dummyObject);
        game.scene.add(this.parent);

        gltfLoader.load('/assets/home_planet/home_planet.gltf', gltf => 
        {
            const root = gltf.scene;

            const clouds = root.children.find(o => o.name === 'clouds')!;
            setMaterial(clouds, new THREE.MeshPhongMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 0.2,
            }));

            const world = root.children.find(o => o.name === 'world')!;

            const ground = world.children.find(o => o.name === 'ground')!;
            setMaterial(ground, new THREE.MeshPhongMaterial({
                color:0x8ce366,
                shininess: 10,
            }));

            const sea = world.children.find(child => child.name === 'sea')!;
            setMaterial(sea, new THREE.MeshPhongMaterial({
                color:0x33bbf5,
                shininess: 160,
            }));

            const txtLoader = new THREE.TextureLoader();

            const trees = world.children.find(child => child.name === 'trees')!;
            const treeTexture = txtLoader.load('/assets/home_planet/tree.png');
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            const rocks = world.children.find(child => child.name === 'rocks')!;
            const rockTexture = txtLoader.load('/assets/home_planet/rock.png');
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            this.parent.remove(dummyObject);
            this.parent.add(root);

            const cloudsAxis = new THREE.Vector3(-2, 1, 0).normalize();

            this.updateParent = function(dt: number)
            {
                clouds.rotateOnAxis(cloudsAxis, 0.2 * dt);
            }

        }, undefined, console.error);

        const points = this.calculateLine(0.5, 200);

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
        this.parent.rotateOnAxis(HOME_SELF_AXIS, HOME_SELF_SPEED * dt);

        this.newton(dt);

        this.parent.position.copy(this.position);

        this.updateParent?.(dt);

        // console.log({
        //     x: this.position.x.toFixed(2),
        //     y: this.position.z.toFixed(2),
        // });
    }
}
