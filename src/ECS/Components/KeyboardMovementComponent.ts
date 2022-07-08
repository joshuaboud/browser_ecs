import BaseComponent from "../Component";

export default class KeyboardMovementComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('KeyboardMovementComponent');
	readonly key: symbol = KeyboardMovementComponent.key;
	speed: number;
	affects: 'v' | 'a' | 'd';
	temporary: boolean;
	constructor(speed: number, affects: 'v' | 'a' | 'd' = 'v', temporary: boolean = false) {
		super();
		this.speed = speed;
		this.affects = affects;
		this.temporary = temporary;
	}
}
