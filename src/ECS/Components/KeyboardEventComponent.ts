import BaseComponent from "../Component";
import Entity from "../Entity";

declare module '../Entity' {
	interface IEntityComponents {
		[KeyboardEventComponent.key]?: KeyboardEventComponent;
	}
}

export default class KeyboardEventComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('KeyboardEventComponent');
	/**
	 * Callback function for keyboard keyup/keydown events
	 */
	callback: (entity: Entity, event: KeyboardEvent) => void;
	constructor(callback: (entity: Entity, event: KeyboardEvent) => void) {
		super();
		this.callback = callback;
	}
	key() {
		return KeyboardEventComponent.key;
	}
}
