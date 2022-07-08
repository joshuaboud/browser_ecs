import { vec3 } from "gl-matrix";
import BaseComponent from "../Component";

export default class PositionTrackerComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('PositionTrackerComponent');
	readonly key: symbol = PositionTrackerComponent.key;
	entityId: number;
	offset: vec3;
	offsetFollowsDirection: boolean;
	maxSpeed: number | undefined;
	constructor(entityId: number, offset: vec3 = [0, 0, 0], offsetFollowsDirection: boolean = false, maxSpeed: number | undefined = undefined) {
		super();
		this.entityId = entityId;
		this.offset = offset;
		this.offsetFollowsDirection = offsetFollowsDirection;
		this.maxSpeed = maxSpeed;
	}
}
