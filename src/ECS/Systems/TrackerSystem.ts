import System from "../System";
import ECS from "../ECS";
import KinematicsComponent from "../Components/KinematicsComponent";
import PositionTrackerComponent from "../Components/PostionTrackerComponent";
import { vec3, quat } from "gl-matrix";

const TrackerSystem: System = function (ecs: ECS, delta: number): void {
	for (const entity of ecs.entities.values()) {
		const position = entity.components[KinematicsComponent.key];
		// const positionSetpoint = entity.components[PositionPDComponent.key];
		const positionTracker = entity.components[PositionTrackerComponent.key];
		if (positionTracker && position) {
			const trackee = ecs.entities.get(positionTracker.entityId);
			if (trackee) {
				const trackeeKine = trackee.components[KinematicsComponent.key];
				if (trackeeKine) {
					const offset = vec3.clone(positionTracker.offset);
					if (positionTracker.offsetFollowsDirection) {
						const rotationQuat = quat.rotationTo([0, 0, 0, 0], vec3.normalize([0, 0, 0], offset), trackeeKine.direction);
						vec3.transformQuat(offset, offset, rotationQuat);
					}
					const dDesired = vec3.add([0, 0, 0], trackeeKine.d, offset);
					if (positionTracker.maxSpeed === undefined) {
						position.d = dDesired;
					} else {
						const displacement = vec3.sub([0, 0, 0], dDesired, position.d);
						const distance = vec3.len(displacement);
						const speed = distance / delta;
						if (speed > positionTracker.maxSpeed) {
							vec3.scale(displacement, vec3.normalize([0, 0, 0], displacement), positionTracker.maxSpeed * delta);
						}
						vec3.add(position.d, position.d, displacement);
					}
				}
			}
		}
	}
}

export default TrackerSystem;
