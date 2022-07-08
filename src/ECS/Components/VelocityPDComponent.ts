import BasePDComponent from "./BasePDComponent";
import { vec3 } from 'gl-matrix';

export default class VelocityPDComponent extends BasePDComponent {
	static readonly key: unique symbol = Symbol('VelocityPDComponent');
	readonly key: symbol = VelocityPDComponent.key;
	v: vec3;
	constructor(kp: number, kd: number, setpoint: vec3) {
		super(kp, kd);
		this.v = setpoint;
	}
}
