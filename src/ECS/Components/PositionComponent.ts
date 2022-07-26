import IComponent from "../Component";

declare module '../../Entity' {
	interface IEntityComponents {
		[PositionComponent.key]?: PositionComponent;
	}
}

export default class PositionComponent implements IComponent {
	static instances = new Map<number, PositionComponent>;
	constructor(public entityId: number, public x: number, public y: number) {
		PositionComponent.instances.set(entityId, this);
	}
	stringify(): string {
		return `Position: ${this.x}, ${this.y}`
	}
}

PositionComponent.components
