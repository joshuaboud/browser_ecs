import BaseComponent from "../Component";
import Entity from "../Entity";

export default class KeyboardEventComponent extends BaseComponent {
	static readonly key: unique symbol = Symbol('KeyboardEventComponent');
	readonly key: symbol = KeyboardEventComponent.key;
	/**
	 * Callback function for keyboard keyup/keydown events
	 */
	callback: (entity: Entity, event: KeyboardEvent) => void;
	constructor(callback: (entity: Entity, event: KeyboardEvent) => void) {
		super();
		this.callback = callback;
	}
}
