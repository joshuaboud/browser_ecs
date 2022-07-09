import BasePDComponent from "./BasePDComponent";
import { vec3 } from 'gl-matrix';

declare module '../Entity' {
	interface IEntityComponents {
		[VelocityPDComponent.key]?: VelocityPDComponent;
	}
}

export default class VelocityPDComponent extends BasePDComponent {
	static readonly key: unique symbol = Symbol('VelocityPDComponent');
	v: vec3;
	constructor(kp: number, kd: number, setpoint: vec3) {
		super(kp, kd);
		this.v = setpoint;
	}
	key() {
		return VelocityPDComponent.key;
	}
}
