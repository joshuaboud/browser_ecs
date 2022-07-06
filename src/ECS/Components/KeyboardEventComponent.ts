import { BaseComponent } from "../Component";
import Entity from "../Entity";

export default class KeyboardEventComponent extends BaseComponent {
	static readonly key: string = 'KeyboardEventComponent';
	readonly key: string = KeyboardEventComponent.key;
	callback: (entity: Entity, event: KeyboardEvent) => void;
	constructor(callback: (entity: Entity, event: KeyboardEvent) => void) {
		super();
		this.callback = callback;
	}
}
