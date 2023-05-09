import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Sun } from "./celestialBodies/sun";
import { GameObject } from "./GameObject";
import { loadSkybox } from "./utils/loadSkybox";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { HomePlanet } from "./celestialBodies/home";
import * as TWEEN from '@tweenjs/tween.js';
import { ProjectsPlanet } from "./celestialBodies/projects";
import routes from "../pages/routes";
import { NotFoundPlanet } from "./celestialBodies/not-found";
import { ContactPlanet } from "./celestialBodies/contact";
import { EventRayCaster } from "./utils/EventRayCaster";

export class Game
{
    public renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: OrbitControls;
    private orbitControlsTarget: THREE.Vector3 | undefined;
    public composer: EffectComposer;
    public lighting: THREE.Object3D;

    public gameObjects: GameObject[] = [];

    private lastTime: number = new Date().getTime();

    private lastPlanetSlug?: string = 'none';

    private eventRayCaster: EventRayCaster;

    public sun: Sun;
    public homePlanet: HomePlanet;
    public projectsPlanet: ProjectsPlanet;
    public notFoundPlanet: NotFoundPlanet;
    public contactPlanet: ContactPlanet;

    constructor(
        canvas: HTMLCanvasElement,
        width: number,
        height: number,
    )
    {
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        this.renderer.toneMapping = THREE.LinearToneMapping;
        this.renderer.toneMappingExposure = 0.8

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x5a536b);

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
        this.camera.position.z = 5;
        this.camera.position.y = 1.5;

        // const viewOffsetFactor = 0.85;
        // camera.setViewOffset(
        //     width, 
        //     height * viewOffsetFactor, 
        //     0, 0, 
        //     width, 
        //     height);

        // const eventCaster = new EventRayCaster(canvas, _scene, _camera);
        // eventCaster.listen('click', {
        //     capture: true,
        // });

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.rotateSpeed = 0.8;
        this.orbitControls.target = new THREE.Vector3(0, 0, 0);
        this.orbitControls.minDistance = 1.8;
        this.orbitControls.maxDistance = 300;
        this.orbitControls.enablePan = false;

        this.lighting = new THREE.Object3D();
        this.scene.add(this.lighting);

        const dirLight = new THREE.DirectionalLight(0xfffebf, .6);
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
        dirLight.target = this.lighting;
        this.lighting.add(dirLight);

        const ambientLight = new THREE.AmbientLight(0xabd7f5, 0.8);
        this.lighting.add(ambientLight);

        loadSkybox('/assets/skybox/', skymap =>
        {
            const skyboxSize = 5000;
            const skybox = new THREE.Mesh(
                new THREE.SphereGeometry(skyboxSize, 16, 8),
                new THREE.MeshBasicMaterial({
                    envMap: skymap,
                    side: THREE.BackSide,
                }),
            );
            this.scene.add(skybox);
        })

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.8;
        bloomPass.strength = 1;
        bloomPass.radius = 1;

        this.composer.addPass(bloomPass);

        this.eventRayCaster = new EventRayCaster(canvas, this.scene, this.camera);
        this.eventRayCaster.listen('click',
        {
            capture: true
        });

        this.sun = new Sun(this);
        this.homePlanet = new HomePlanet(this);
        this.projectsPlanet = new ProjectsPlanet(this);
        this.notFoundPlanet = new NotFoundPlanet(this);
        this.contactPlanet = new ContactPlanet(this);
    }

    resize(width: number, height: number)
    {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        // this.camera.setViewOffset(
        //     width, 
        //     height * viewOffsetFactor, 
        //     0, 0, 
        //     width, 
        //     height);

        this.renderer.setSize(width, height);
    }

    route(slug: string)
    {

        /**
         * By reference => vectors change during animation
         */
        let vectorB = new THREE.Vector3();

        switch (slug)
        {
            case 'home':
                vectorB = this.homePlanet.position;
                break;
            case 'projects':
                vectorB = this.projectsPlanet.position;
                break;
            case 'not-found':
                vectorB = this.notFoundPlanet.position;
                break;
            case 'contact':
                vectorB = this.contactPlanet.position;
                break;
        }

        if (!this.orbitControlsTarget)
            this.orbitControlsTarget = vectorB;
        
        const vectorA = this.orbitControlsTarget;

        TWEEN.removeAll();

        const tween = new TWEEN.Tween({ t: 0 })
            .to({ t: 1 })
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .duration(3000)
            .onUpdate(({ t }) => 
            {
                const vectorC = vectorA.clone().lerp(vectorB, t);
                this.orbitControlsTarget = vectorC;
            })
            .onComplete(() =>
            {
                this.orbitControlsTarget = vectorB;
            })
            .start();
    }

    animate()
    {
        const now = new Date().getTime();
        const dt = 0.001 * (now - this.lastTime);
        this.lastTime = now;

        for (const go of this.gameObjects)
        {
            go.update(dt);
        }

        /**
         * routing
         */

        const planetSlug = location.pathname.split('/')[1].trim() || 'home';

        if (this.lastPlanetSlug !== planetSlug) {
            this.lastPlanetSlug = planetSlug;
            this.route(planetSlug);
        }


        TWEEN.update();

        if (this.orbitControlsTarget)
        {
            const targetDelta = this.orbitControlsTarget.clone().sub(this.orbitControls.target);
            this.orbitControls.target.copy(this.orbitControlsTarget);
            this.camera.position.add(targetDelta);
        }
        
        this.orbitControls.update();
        this.camera.updateProjectionMatrix();
        
        this.lighting.position.copy(this.camera.position);

        this.composer.render();
    }
}