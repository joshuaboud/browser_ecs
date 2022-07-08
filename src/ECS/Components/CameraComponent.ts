import BaseComponent from "../Component";

export default class CameraComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('CameraComponent');
	readonly key: symbol = CameraComponent.key;
	/**
	 * Context of canvas to render to
	 */
	ctx: CanvasRenderingContext2D;
	/**
	 * Width of camera view
	 */
	width: number;
	/**
	 * Height of camera view
	 */
	height: number;
	constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
		super();
		this.ctx = ctx;
		this.width = width;
		this.height = height;
	}
}
