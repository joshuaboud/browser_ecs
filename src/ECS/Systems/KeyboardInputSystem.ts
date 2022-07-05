// if (keyboardMovement) {
// 	vec3.add(
// 		deltaD,
// 		deltaD,
// 		vec3.scale(
// 			vec3.create(),
// 			vec3.fromValues(
// 				(ecs.keysHeld.a ? -1 : 0) + (ecs.keysHeld.d ? 1 : 0),
// 				(ecs.keysHeld.w ? -1 : 0) + (ecs.keysHeld.s ? 1 : 0),
// 				0
// 			),
// 			keyboardMovement.speed * delta
// 		)
// 	)
// }

import System from "../System";
import ECS from "../ECS";
import KinematicsComponent from "../Components/KinematicsComponent";
import KeyboardMovementComponent from "../Components/KeyboardMovementComponent";
import { vec3 } from "gl-matrix";
import PositionPDComponent from "../Components/PositionPDComponent";
import VelocityPDComponent from "../Components/VelocityPDComponent";

const movementLut: { [key: string]: vec3 | undefined } = {
	'w': vec3.fromValues(0, -1, 0),
	'a': vec3.fromValues(-1, 0, 0),
	's': vec3.fromValues(0, 1, 0),
	'd': vec3.fromValues(1, 0, 0),
}

let eventTally = 0;

const KeyboardInputSystem: System = function (ecs: ECS, _delta: number): void {
	const keyEvents = ecs.keyEvents.splice(0);
	eventTally += keyEvents.length;
	if (!keyEvents.length)
		return;
	console.log('Input system events received', eventTally);
	const [additive, subtractive] = keyEvents.reduce<[vec3, vec3]>(([additive, subtractive], event: KeyboardEvent) => {
		console.log(event);
		const dvi = movementLut[event.key];
		if (dvi) {
			if (event.type === 'keydown')
				vec3.add(additive, additive, dvi);
			else if (event.type === 'keyup')
				vec3.sub(subtractive, subtractive, dvi);
		}
		return [additive, subtractive];
	}, [vec3.create(), vec3.create()]);
	for (const entity of ecs.entities.values()) {
		const movement = entity.components.get(KeyboardMovementComponent.key) as KeyboardMovementComponent | undefined;
		if (!movement)
			continue;
		let target: vec3;
		const positionPd = entity.components.get(PositionPDComponent.key) as PositionPDComponent | undefined;
		const velocityPd = entity.components.get(VelocityPDComponent.key) as VelocityPDComponent | undefined;
		if (movement.affects === 'd' && positionPd) {
			target = positionPd.setpoint;
		} else if (movement.affects === 'v' && velocityPd) {
			target = velocityPd.setpoint;
		} else {
			const kine = entity.components.get(KinematicsComponent.key) as KinematicsComponent | undefined;
			if (!kine)
				continue;
			target = kine[movement.affects];
		}
		vec3.add(target, target, vec3.scale(vec3.create(), additive, movement.speed));
		if (!movement.temporary)
			vec3.add(target, target, vec3.scale(vec3.create(), subtractive, movement.speed));
	}
}

export default KeyboardInputSystem;
