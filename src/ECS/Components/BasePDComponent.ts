import BaseComponent from "../Component";
import { vec3 } from 'gl-matrix';

export default class BasePDComponent extends BaseComponent {
	/**
	 * Proportional PD controller coefficient
	 */
	kp: number;
	/**
	 * Derivative PD controller coefficient
	 */
	kd: number;
	/**
	 * Holds last error for calculating derivative
	 */
	lastError: vec3;
	constructor(kp: number, kd: number) {
		super();
		this.kp = kp;
		this.kd = kd;
		this.lastError = vec3.fromValues(0, 0, 0);
	}
}
