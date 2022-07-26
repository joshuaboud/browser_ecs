import BaseComponent from "../Component";
import { vec3 } from 'gl-matrix';

declare module '../../Entity' {
	interface IEntityComponents {
		[KinematicsComponent.key]?: KinematicsComponent;
	}
}

export default class KinematicsComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('KinematicsComponent');
	d: vec3;
	v: vec3;
	a: vec3;
	direction: vec3;
	constructor(position: number[], velocity?: number[], acceleration?: number[], direction?: number[]) {
		super();
		this.d = vec3.fromValues(position[0] ?? 0, position[1] ?? 0, position[3] ?? 0);
		this.v = vec3.fromValues(velocity?.[0] ?? 0, velocity?.[1] ?? 0, velocity?.[3] ?? 0);
		this.a = vec3.fromValues(acceleration?.[0] ?? 0, acceleration?.[1] ?? 0, acceleration?.[3] ?? 0);
		this.direction = vec3.normalize([0, 0, 0], vec3.fromValues(direction?.[0] ?? 0, direction?.[1] ?? 0, direction?.[3] ?? 0));
	}
	key() {
		return KinematicsComponent.key;
	}
}
