import System from "../System";
import ECS from "../ECS";
import KinematicsComponent from "../Components/KinematicsComponent";
import { vec3 } from "gl-matrix";
import PositionPDComponent from "../Components/PositionPDComponent";
import VelocityPDComponent from "../Components/VelocityPDComponent";

const PDSystem: System = function (ecs: ECS, delta: number): void {
	for (const entity of ecs.entities.values()) {
		const kine = entity.components.get(KinematicsComponent.key) as KinematicsComponent | undefined;
		if (!kine)
			return;
		const posPd = entity.components.get(PositionPDComponent.key) as PositionPDComponent | undefined;
		const velPd = entity.components.get(VelocityPDComponent.key) as VelocityPDComponent | undefined;
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
