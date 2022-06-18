import * as THREE from 'three';
import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { ORBIT_TIME_FACTOR, SUN_MASS_TIMES_G } from './utils/constants';

function simulate(p: THREE.Vector3, v: THREE.Vector3, dt: number)
{
    const magP = p.length();
    const F_scalar = -SUN_MASS_TIMES_G / (magP * magP * magP);
    const F = p.clone().multiplyScalar(F_scalar);

    v.add(F.multiplyScalar(dt));
    p.add(v.clone().multiplyScalar(dt));
}

export abstract class Planet extends GameObject
{
    constructor(
        game: Game, 
        public position: THREE.Vector3,
        private velocity: THREE.Vector3,
    )
    {
        super(game);
    }

    newton(dt: number)
    {
        const orbital_dt = dt * ORBIT_TIME_FACTOR;

        simulate(this.position, this.velocity, orbital_dt);
    }
 
    calculateLine(lineDt: number, maxIterations: number)
    {
        const p = this.position.clone();
        const v = this.velocity.clone();

        const cross = p.clone().cross(v);
        const sign = Math.sign(cross.y);

        const startAngle = sign * Math.atan2(p.z, p.x);
        let lastAngle = startAngle;

        const points: THREE.Vector3[] = [];

        for (let i = 0; i < maxIterations; i++)
        {
            simulate(p, v, lineDt);

            const angle = sign * Math.atan2(p.z, p.x);

            if (lastAngle > startAngle && startAngle >= angle)
            {
                points.push(this.position.clone()); // add end point

                return points;
            }

            lastAngle = angle;

            points.push(p.clone());
        }

        return points;
    }
}