import BaseComponent from "../Component";

declare module '../Entity' {
	interface IEntityComponents {
		[PositionComponent.key]?: PositionComponent;
	}
}

export default class PositionComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('PositionComponent');
	x: number;
	y: number;
	constructor(x: number, y: number) {
		super();
		this.x = x;
		this.y = y;
	}
	key() {
		return PositionComponent.key;
	}
}
