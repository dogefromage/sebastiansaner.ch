import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GameObject } from "./GameObject";

export class Game
{
    public renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public orbitControls: OrbitControls;
    public composer: EffectComposer;
    public lighting: THREE.Object3D;
    
    public gameObjects: GameObject[] = [];

    private lastTime: number = new Date().getTime();
    
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

        this.scene = new THREE.Scene();
        this.scene.background = null;

        this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 500);
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
		this.orbitControls.dampingFactor = 0.5;
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

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000 })
        );
        cube.position.set(0, 0, 0);
        this.scene.add(cube);
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

    animate()
    {
        const now = new Date().getTime();
        const dt = 0.001 * (now - this.lastTime);
        this.lastTime = now;

        for (const go of this.gameObjects)
        {
            go.update(dt);
        }

        this.lighting.position.copy(this.camera.position);

        this.orbitControls.update();

        this.composer.render();
    }
}