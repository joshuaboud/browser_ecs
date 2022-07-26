import BaseComponent from "../Component";

declare module '../../Entity' {
	interface IEntityComponents {
		[CameraComponent.key]?: CameraComponent;
	}
}

export default class CameraComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('CameraComponent');
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
	key() {
		return CameraComponent.key;
	}
}
