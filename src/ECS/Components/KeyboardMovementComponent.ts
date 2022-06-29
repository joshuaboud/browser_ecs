import { BaseComponent } from "../Component";

export default class KeyboardMovementComponent extends BaseComponent {
	static readonly key: string = 'KeyboardMovementComponent';
	readonly key: string = KeyboardMovementComponent.key;
	speed: number;
	keysHeld: {[key: string]: boolean}
	constructor(speed: number) {
		super();
		this.speed = speed;
		this.keysHeld = {};
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			this.keysHeld[event.key] = true;
		})
		window.addEventListener('keyup', (event: KeyboardEvent) => {
			delete this.keysHeld[event.key];
		})
	}
}
