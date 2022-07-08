import BaseComponent from "../Component";

export default class PositionComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('PositionComponent');
	readonly key: symbol = PositionComponent.key;
	x: number;
	y: number;
	constructor(x: number, y: number) {
		super();
		this.x = x;
		this.y = y;
	}
}
