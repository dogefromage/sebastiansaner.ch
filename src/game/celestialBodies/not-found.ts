import { Game } from "../Game";
import { Planet } from "../Planet";
import { NOT_FOUND_POS, NOT_FOUND_SELF_AXIS, NOT_FOUND_SELF_SPEED, NOT_FOUND_VEL } from "../utils/constants";
import * as THREE from 'three';
import gltfLoader from "../utils/gltfLoader";
import { setMaterial } from "../../utils/setMaterial";

export class NotFoundPlanet extends Planet
{
    private parent: THREE.Object3D;
    private updateParent?: (dt: number) => void;

    constructor(game: Game)
    {
        super(
            game,
            NOT_FOUND_POS,
            NOT_FOUND_VEL,
        );
        
        const dummyObject = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 8),
            new THREE.MeshPhongMaterial({
                color: 0x484C68,
            })
        );

        this.parent = new THREE.Object3D();
        this.parent.name = 'Not Found Planet';
        this.parent.scale.multiplyScalar(0.3);
        this.parent.add(dummyObject);
        game.scene.add(this.parent);

        gltfLoader.load('/assets/not_found_planet/not_found_planet.gltf', gltf => 
        {
            const root = gltf.scene;

            const world = root.children.find(o => o.name === 'world')!;

            const ground = world.children.find(o => o.name === 'ground')!;
            setMaterial(ground, new THREE.MeshPhongMaterial({
                color: 0x484C68,
                shininess: 20,
            }));

            const txtLoader = new THREE.TextureLoader();

            const lava = world.children.find(child => child.name === 'lava')!;
            setMaterial(lava, new THREE.MeshPhongMaterial({
                map: txtLoader.load('/assets/not_found_planet/lava.png'),
                emissive: 0xd1493c,
            }));

            const trees = world.children.find(child => child.name === 'trees')!;
            const treeTexture = txtLoader.load('/assets/not_found_planet/tree.png');
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            const rocks = world.children.find(child => child.name === 'rocks')!;
            const rockTexture = txtLoader.load('/assets/not_found_planet/rock.png');
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            const blackhole = world.children.find(child => child.name === 'void')!;
            setMaterial(blackhole, new THREE.MeshBasicMaterial({
                color: 0x000000,
            }));

            this.parent.remove(dummyObject);
            this.parent.add(root);

        }, undefined, console.error);

        const points = this.calculateLine(2, 400);

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
        this.parent.rotateOnAxis(NOT_FOUND_SELF_AXIS, NOT_FOUND_SELF_SPEED * dt);

        this.newton(dt);

        this.parent.position.copy(this.position);

        this.updateParent?.(dt);
    }
}
