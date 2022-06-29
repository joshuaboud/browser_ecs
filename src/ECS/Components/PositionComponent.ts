import { BaseComponent } from "../Component";

export default class PositionComponent extends BaseComponent {
	static readonly key: string = 'PositionComponent';
	readonly key: string = PositionComponent.key;
	x: number;
	y: number;
	constructor(x: number, y: number) {
		super();
		this.x = x;
		this.y = y;
	}
}
