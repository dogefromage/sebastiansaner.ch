import React from 'react';
import * as THREE from 'three';

export class EventRayCaster
{
    private listeners = new Map<string, EventListener>();
    private raycaster = new THREE.Raycaster();

    constructor(
        private canvas: HTMLCanvasElement, 
        private scene: THREE.Scene, 
        private camera: THREE.Camera
    ) { }

    listen(eventName: string, 
        {
            capture = false,
            bubble = true,
        } = {})
    {
        this.remove(eventName);

        const listener = (e: MouseEvent) =>
        {
            const target = e.target as HTMLCanvasElement;

            const dx = e.offsetX / target.clientWidth;
            const dy = e.offsetY / target.clientHeight;

            const mousePos = new THREE.Vector2(
                dx * 2 - 1,
                -dy * 2 + 1,
            );

            this.raycaster.setFromCamera(mousePos, this.camera);
            const intersections = this.raycaster.intersectObjects(this.scene.children, true);

            const calledEventDispatchers = new Set<string>();

            for (const intersection of intersections)
            {
                if (intersection.object && (intersection.object as THREE.Mesh).isMesh)
                {
                    let obj: THREE.Object3D | null = intersection.object;
                    let bubbling = true;

                    const stopBubbling = () => { bubbling = false };

                    while (obj && bubbling)
                    {
                        if (!calledEventDispatchers.has(obj.uuid))
                        {
                            console.log(obj.name);

                            obj.dispatchEvent({ 
                                type: eventName, 
                                ...intersection, 
                                domEvent: e,
                                stopBubbling,
                            });
                            calledEventDispatchers.add(obj.uuid);
                        }

                        obj = obj.parent;
                    }
                }

                if (capture) break;
            }
        };

        this.canvas.addEventListener(eventName, listener as EventListener, false);
        this.listeners.set(eventName, listener as EventListener);
    }

    remove(eventName: string)
    {
        this.canvas.removeEventListener(eventName, this.listeners.get(eventName)!);
        this.listeners.delete(eventName);
    }
}
