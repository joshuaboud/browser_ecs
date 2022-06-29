import Entity from "./Entity";

export default interface System {
	relevantComponents?: Array<string>;
	(entities: Array<Entity>, delta: number): void
}
