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
			const error = vec3.sub(vec3.create(), velPd.setpoint, kine.v);
			const dError = vec3.scale(vec3.create(), vec3.sub(vec3.create(), error, velPd.lastError), 1 / delta);
			velPd.lastError = error;
			vec3.add(kine.a, vec3.scale(vec3.create(), error, velPd.kp), vec3.scale(vec3.create(), dError, velPd.kd));
		}
		if (posPd) {
			const error = vec3.sub(vec3.create(), posPd.setpoint, kine.d);
			const dError = vec3.scale(vec3.create(), vec3.sub(vec3.create(), error, posPd.lastError), 1 / delta);
			posPd.lastError = error;
			vec3.add(kine.v, vec3.scale(vec3.create(), error, posPd.kp), vec3.scale(vec3.create(), dError, posPd.kd));
		}
	}
}

export default PDSystem;
