import BaseComponent from "../Component";

declare module '../../Entity' {
	interface IEntityComponents {
		[KeyboardMovementComponent.key]?: KeyboardMovementComponent;
	}
}

export default class KeyboardMovementComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('KeyboardMovementComponent');
	speed: number;
	affects: 'v' | 'a' | 'd';
	temporary: boolean;
	constructor(speed: number, affects: 'v' | 'a' | 'd' = 'v', temporary: boolean = false) {
		super();
		this.speed = speed;
		this.affects = affects;
		this.temporary = temporary;
	}
	key() {
		return KeyboardMovementComponent.key;
	}
}
