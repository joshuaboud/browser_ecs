import BasePDComponent from "./BasePDComponent";
import { vec3 } from 'gl-matrix';

export default class VelocityPDComponent extends BasePDComponent {
	static readonly key: string = 'VelocityPDComponent';
	readonly key: string = VelocityPDComponent.key;
	constructor(kp: number, kd: number, setpoint: vec3) {
		super(kp, kd, setpoint);
	}
}
