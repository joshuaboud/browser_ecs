import ECS from "./ECS";

export default interface System {
	(ecs: ECS, delta: number): void
}
