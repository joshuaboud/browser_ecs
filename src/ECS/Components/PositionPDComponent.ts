import BasePDComponent from "./BasePDComponent";
import { vec3 } from 'gl-matrix';

declare module '../../Entity' {
	interface IEntityComponents {
		[PositionPDComponent.key]?: PositionPDComponent;
	}
}

export default class PositionPDComponent extends BasePDComponent {
	static readonly key: unique symbol = Symbol('PositionPDComponent');
	d: vec3;
	constructor(kp: number, kd: number, setpoint: vec3) {
		super(kp, kd);
		this.d = setpoint;
	}
	key() {
		return PositionPDComponent.key;
	}
}
