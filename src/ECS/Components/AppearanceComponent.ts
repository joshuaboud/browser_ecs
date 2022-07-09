import BaseComponent from "../Component";

declare module '../Entity' {
	interface IEntityComponents {
		[AppearanceComponent.key]?: AppearanceComponent;
	}
}

export default class AppearanceComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('AppearanceComponent');
	public sprite: CanvasImageSource;
	/**
	 * Width of sprite
	 */
	width: number;
	/**
	 * Height of sprite
	 */
	height: number;
	/**
	 * Whether or not to show
	 */
	hidden: boolean;
	constructor(sprite: CanvasImageSource, width: number, height: number, hidden: boolean = false) {
		super();
		this.sprite = sprite;
		this.width = width;
		this.height = height;
		this.hidden = hidden;
	}
	key() {
		return AppearanceComponent.key;
	}
}
