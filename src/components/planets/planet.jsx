import { useUpdate } from '../threeProvider';

export function useOrbit(objRef, radius, orbitalPhase, orbitalSpeed, rotationalSpeed)
{
    useUpdate(({ time }) =>
    {
        let p = objRef.current;
        if (!p) return;

        p.position.x = radius * Math.cos(orbitalSpeed * time + orbitalPhase);
        p.position.z = radius * Math.sin(orbitalSpeed * time + orbitalPhase);

        p.rotation.y = rotationalSpeed * time;

    }, [ radius, orbitalSpeed, rotationalSpeed, orbitalPhase ]);
}

export function orbit(obj, time, radius, orbitalPhase, orbitalSpeed)
{
    if (!obj) return;

    obj.position.x = radius * Math.cos(orbitalSpeed * time + orbitalPhase);
    obj.position.z = radius * Math.sin(orbitalSpeed * time + orbitalPhase);
}

export function rotate(obj, time, rotationalSpeedY, rotationalSpeedX = 0, rotationalSpeedZ = 0)
{
    if (!obj) return;

    obj.rotation.y = rotationalSpeedY * time;
    if (rotationalSpeedX) obj.rotation.x = rotationalSpeedX * time;
    if (rotationalSpeedZ) obj.rotation.z = rotationalSpeedZ * time;
}

export function setMaterial(obj, material)
{
    obj.traverse((o) =>
    {
        o.material = material;
    });
}