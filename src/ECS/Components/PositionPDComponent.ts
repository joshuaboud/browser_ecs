import BasePDComponent from "./BasePDComponent";
import { vec3 } from 'gl-matrix';

export default class PositionPDComponent extends BasePDComponent {
	static readonly key: unique symbol = Symbol('PositionPDComponent');
	readonly key: symbol = PositionPDComponent.key;
	d: vec3;
	constructor(kp: number, kd: number, setpoint: vec3) {
		super(kp, kd);
		this.d = setpoint;
	}
}
