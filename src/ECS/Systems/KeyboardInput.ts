import System from "../System";
import Entity from "../Entity";
import PositionComponent from "../Components/PositionComponent";
import KeyboardMovementComponent from "../Components/KeyboardMovementComponent";

const KeyboardInputSystem: System = function (entities: Array<Entity>, delta: number): void {
	const entityCount = entities.length;
	for (let i = 0; i < entityCount; i++) {
		const entity = entities[i];
		const position = PositionComponent.getEntityComponent<PositionComponent>(entity);
		const movement = KeyboardMovementComponent.getEntityComponent<KeyboardMovementComponent>(entity);
		if (position && movement) {
			const posDelta = movement.speed * delta;
			const posDeltaVec = { x: 0, y: 0 };
			if (movement.keysHeld['w'])
				posDeltaVec.y -= 1;
			if (movement.keysHeld['a'])
				posDeltaVec.x -= 1;
			if (movement.keysHeld['s'])
				posDeltaVec.y += 1;
			if (movement.keysHeld['d'])
				posDeltaVec.x += 1;
			const magnitude = (posDeltaVec.x === 0 || posDeltaVec.y === 0)
				? 1
				: Math.sqrt(Math.pow(posDeltaVec.x, 2) + Math.pow(posDeltaVec.y, 2));
			position.x += posDelta * posDeltaVec.x / magnitude;
			position.y += posDelta * posDeltaVec.y / magnitude;
		}
	}
}

KeyboardInputSystem.relevantComponents = [
	KeyboardMovementComponent.key,
	PositionComponent.key,
]

export default KeyboardInputSystem;
