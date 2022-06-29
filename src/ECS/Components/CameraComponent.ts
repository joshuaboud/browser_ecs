import { BaseComponent } from "../Component";

export default class CameraComponent extends BaseComponent {
	static readonly key: string = 'CameraComponent';
	readonly key: string = CameraComponent.key;
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
		super();
		this.ctx = ctx;
		this.width = width;
		this.height = height;
	}
}
