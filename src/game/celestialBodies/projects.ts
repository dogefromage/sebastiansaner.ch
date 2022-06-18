import { Game } from "../Game";
import { Planet } from "../Planet";
import { PROJECTS_POS, PROJECTS_SELF_AXIS, PROJECTS_SELF_SPEED, PROJECTS_VEL } from "../utils/constants";
import * as THREE from 'three';
import gltfLoader from "../utils/gltfLoader";
import { setMaterial } from "../../utils/setMaterial";

export class ProjectsPlanet extends Planet
{
    private parent: THREE.Object3D;
    private updateParent?: (dt: number) => void;

    constructor(game: Game)
    {
        super(
            game,
            PROJECTS_POS,
            PROJECTS_VEL,
        );
        
        const dummyObject = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 8),
            new THREE.MeshPhongMaterial({
                color: 0xffe889,
            })
        );

        this.parent = new THREE.Object3D();
        this.parent.name = 'Projects Planet';
        this.parent.scale.multiplyScalar(0.8);
        this.parent.add(dummyObject);
        game.scene.add(this.parent);

        gltfLoader.load('/assets/projects_planet/projects_planet.gltf', gltf => 
        {
            const root = gltf.scene;

            const world = root.children.find(o => o.name === 'world')!;

            const ground = world.children.find(o => o.name === 'ground')!;
            setMaterial(ground, new THREE.MeshPhongMaterial({
                color:0xFFE889,
                shininess: 10,
            }));

            const sea = world.children.find(child => child.name === 'sea')!;
            setMaterial(sea, new THREE.MeshPhongMaterial({
                color:0x38A1E7,
                shininess: 160,
            }));

            const txtLoader = new THREE.TextureLoader();

            const trees = world.children.find(child => child.name === 'trees')!;
            const treeTexture = txtLoader.load('/assets/projects_planet/tree.png');
            setMaterial(trees, new THREE.MeshPhongMaterial({
                map: treeTexture
            }));

            const rocks = world.children.find(child => child.name === 'rocks')!;
            const rockTexture = txtLoader.load('/assets/projects_planet/rock.png');
            setMaterial(rocks, new THREE.MeshPhongMaterial({
                map: rockTexture
            }));

            const pyramids = world.children.find(child => child.name === 'pyramids')!;
            const pyramidsTexture = txtLoader.load('/assets/projects_planet/pyramid.png');
            setMaterial(pyramids, new THREE.MeshPhongMaterial({
                map: pyramidsTexture
            }));

            this.parent.remove(dummyObject);
            this.parent.add(root);

        }, undefined, console.error);

        const points = this.calculateLine(1, 200);

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
        this.parent.rotateOnAxis(PROJECTS_SELF_AXIS, PROJECTS_SELF_SPEED * dt);

        this.newton(dt);

        this.parent.position.copy(this.position);

        this.updateParent?.(dt);
    }
}
