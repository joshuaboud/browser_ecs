import System from "../System";
import ECS from "../ECS";
import KinematicsComponent from "../Component/Components/KinematicsComponent";
import { vec3 } from "gl-matrix";
import PositionPDComponent from "../Component/Components/PositionPDComponent";
import VelocityPDComponent from "../Component/Components/VelocityPDComponent";

const PDSystem: System = function (ecs: ECS, delta: number): void {
	for (const entity of ecs.entities.values()) {
		const kine = entity.components[KinematicsComponent.key];
		if (!kine)
			return;
		const posPd = entity.components[PositionPDComponent.key];
		const velPd = entity.components[VelocityPDComponent.key];
		if (velPd) {
			const error = vec3.sub([0, 0, 0], velPd.v, kine.v);
			const dError = vec3.scale([0, 0, 0], vec3.sub([0, 0, 0], velPd.lastError, error), 1 / delta);
			velPd.lastError = error;
			vec3.add(kine.a, vec3.scale([0, 0, 0], error, velPd.kp), vec3.scale([0, 0, 0], dError, velPd.kd));
		}
		if (posPd) {
			const error = vec3.sub([0, 0, 0], posPd.d, kine.d);
			const dError = vec3.scale([0, 0, 0], vec3.sub([0, 0, 0], posPd.lastError, error), 1 / delta);
			posPd.lastError = error;
			vec3.add(kine.v, vec3.scale([0, 0, 0], error, posPd.kp), vec3.scale([0, 0, 0], dError, posPd.kd));
		}
	}
}

export default PDSystem;
