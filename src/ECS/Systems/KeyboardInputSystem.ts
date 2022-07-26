// if (keyboardMovement) {
// 	vec3.add(
// 		deltaD,
// 		deltaD,
// 		vec3.scale(
// 			[0, 0, 0],
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
import KinematicsComponent from "../Component/Components/KinematicsComponent";
import KeyboardMovementComponent from "../Component/Components/KeyboardMovementComponent";
import { vec3 } from "gl-matrix";
import PositionPDComponent from "../Component/Components/PositionPDComponent";
import VelocityPDComponent from "../Component/Components/VelocityPDComponent";
import KeyboardEventComponent from "../Component/Components/KeyboardEventComponent";

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
	}, [[0, 0, 0], [0, 0, 0]]);
	for (const entity of ecs.entities.values()) {
		const keyboardEvent = entity.components[KeyboardEventComponent.key];
		if (keyboardEvent) {
			for (let i = 0; i < keyEvents.length; i++) {
				keyboardEvent.callback(entity, keyEvents[i]);
			}
		}
		const movement = entity.components[KeyboardMovementComponent.key];
		if (!movement)
			continue;
		const kine = entity.components[KinematicsComponent.key];
		if (!kine)
			continue;
		const position = entity.components[PositionPDComponent.key] ?? kine;
		const velocity = entity.components[VelocityPDComponent.key] ?? kine;
		let target: vec3;
		if (movement.affects === 'd') {
			target = position.d;
		} else if (movement.affects === 'v') {
			target = velocity.v;
		} else if (movement.affects === 'a') {
			target = kine.a;
		} else {
			throw new Error(`Illegal KeyboardMovementComponent.affects: ${movement.affects}`);
		}
		vec3.add(target, target, vec3.scale([0, 0, 0], additive, movement.speed));
		if (!movement.temporary)
			vec3.add(target, target, vec3.scale([0, 0, 0], subtractive, movement.speed));
	}
}

export default KeyboardInputSystem;
