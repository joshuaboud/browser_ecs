import { vec3 } from "gl-matrix";
import BaseComponent from "../Component";

declare module '../../Entity' {
	interface IEntityComponents {
		[PositionTrackerComponent.key]?: PositionTrackerComponent;
	}
}

export default class PositionTrackerComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('PositionTrackerComponent');
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
	key() {
		return PositionTrackerComponent.key;
	}
}
