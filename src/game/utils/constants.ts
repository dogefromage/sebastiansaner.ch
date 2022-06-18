import * as THREE from 'three';

export const SUN_MASS_TIMES_G = 3;

export const ORBIT_TIME_FACTOR = 1;

export const SUN_SELF_AXIS = new THREE.Vector3(1, 3, -2).normalize();
export const SUN_SELF_SPEED = 6.28 / 30;

export const HOME_VEL = new THREE.Vector3(10, 1, 0).setLength(0.8);
export const HOME_POS = new THREE.Vector3(0.5, 10, 1).cross(HOME_VEL).setLength(5);
export const HOME_SELF_AXIS = new THREE.Vector3(5, -3, 2).normalize();
export const HOME_SELF_SPEED = 6.28 / 20;

export const PROJECTS_VEL = new THREE.Vector3(-5, 1, 5).setLength(0.5);
export const PROJECTS_POS = new THREE.Vector3(2, -10, -1).cross(PROJECTS_VEL).setLength(12);
export const PROJECTS_SELF_AXIS = new THREE.Vector3(1, 2, -5).normalize();
export const PROJECTS_SELF_SPEED = 6.28 / -15;

export const NOT_FOUND_VEL = new THREE.Vector3(-5, -1, 5).setLength(0.26);
export const NOT_FOUND_POS = new THREE.Vector3(3, 10, 0.7).cross(NOT_FOUND_VEL).setLength(20);
export const NOT_FOUND_SELF_AXIS = new THREE.Vector3(5, -2, 0).normalize();
export const NOT_FOUND_SELF_SPEED = 6.28 / -40;

export const CONTACT_VEL = new THREE.Vector3(5, 1, 5).setLength(0.45);
export const CONTACT_POS = new THREE.Vector3(1, 10, 0).cross(CONTACT_VEL).setLength(15);
export const CONTACT_SELF_AXIS = new THREE.Vector3(3, 0, -5).normalize();
export const CONTACT_SELF_SPEED = 6.28 / -15;