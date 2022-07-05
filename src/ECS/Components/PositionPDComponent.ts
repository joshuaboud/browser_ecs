import BasePDComponent from "./BasePDComponent";
import { vec3 } from 'gl-matrix';

export default class PositionPDComponent extends BasePDComponent {
	static readonly key: string = 'PositionPDComponent';
	readonly key: string = PositionPDComponent.key;
	constructor(kp: number, kd: number, setpoint: vec3) {
		super(kp, kd, setpoint);
	}
}
