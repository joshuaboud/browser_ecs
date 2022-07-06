import { BaseComponent } from "../Component";
import { vec3 } from 'gl-matrix';

export default class BasePDComponent extends BaseComponent {
	static readonly key: string = 'BasePDComponent';
	readonly key: string = BasePDComponent.key;
	kp: number;
	kd: number;
	lastError: vec3;
	constructor(kp: number, kd: number) {
		super();
		this.kp = kp;
		this.kd = kd;
		this.lastError = vec3.fromValues(0, 0, 0);
	}
}
