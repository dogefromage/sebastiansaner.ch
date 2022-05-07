import * as THREE from 'three';
const raycaster = new THREE.Raycaster();

export class EventRayCaster
{
    constructor(domElement, scene, camera)
    {
        this.domElement = domElement;
        this.scene = scene;
        this.camera = camera;

        this.listeners = new Map();
    }

    listen(eventName, 
        {
            capture = false,
            bubble = true,
        } = {})
    {
        if (typeof (eventName) !== 'string') return;

        this.remove(eventName);

        let listener = this.domElement.addEventListener(eventName, (e) =>
        {
            let calledEventDispatchers = new Set();

            let mousePos = new THREE.Vector2(
                ( e.clientX / window.innerWidth ) * 2 - 1,
                - ( e.clientY / window.innerHeight ) * 2 + 1,
            );

            raycaster.setFromCamera(mousePos, this.camera);
            const intersections = raycaster.intersectObjects(this.scene.children, true);

            for (const intersection of intersections)
            {
                if (intersection.object)
                {
                    let obj = intersection.object;
                    let bubbling = true;
                    let stopBubbling = () => { bubbling = false };

                    while (obj && bubbling)
                    {
                        if (!calledEventDispatchers.has(obj.uuid))
                        {
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
        }, false);

        this.listeners.set(eventName, listener);
    }

    remove(eventName)
    {
        this.domElement.removeEventListener(eventName, this.listeners.get(eventName));
        this.listeners.delete(eventName);
    }
}
