import System from "../System";
import PositionComponent from "../Components/PositionComponent";
import KeyboardMovementComponent from "../Components/KeyboardMovementComponent";
import ECS from "../ECS";

const KeyboardInputSystem: System = function (ecs: ECS, delta: number): void {
	for (const [_entityId, entity] of ecs.entities.entries()) {
		const position = entity.components.get(PositionComponent.key) as PositionComponent | undefined;
		const movement = entity.components.get(KeyboardMovementComponent.key) as KeyboardMovementComponent | undefined;
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

export default KeyboardInputSystem;
