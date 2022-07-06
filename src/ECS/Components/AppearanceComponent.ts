import { BaseComponent } from "../Component";

export default class AppearanceComponent extends BaseComponent {
	static readonly key: string = 'AppearanceComponent';
	readonly key: string = AppearanceComponent.key;
	public sprite: CanvasImageSource;
	width: number;
	height: number;
	hidden: boolean;
	constructor(sprite: CanvasImageSource, width: number, height: number, hidden: boolean = false) {
		super();
		this.sprite = sprite;
		this.width = width;
		this.height = height;
		this.hidden = hidden;
	}
}
