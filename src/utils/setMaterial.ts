import * as THREE from 'three';

export function setMaterial(obj: THREE.Object3D, material: THREE.Material)
{
    obj.traverse(o =>
    {
        o.castShadow = true;
        o.receiveShadow = true;

        if (o instanceof THREE.Mesh)
        {
            o.material = material;
        
            o.geometry.computeBoundingBox();
            o.geometry.computeBoundingSphere();
        }
    });
}