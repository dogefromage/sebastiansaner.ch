import * as THREE from "three";

export function loadSkybox(path: string, onLoaded: (texture: THREE.CubeTexture) => void)
{
    const loader = new THREE.CubeTextureLoader();
    loader.setPath(path);
    
    loader.load( [
        'skymapRT.png', 'skymapLF.png',
        'skymapUP.png', 'skymapDN.png',
        'skymapFT.png', 'skymapBK.png'
    ], onLoaded, undefined, console.error);
}