import System from "../System";
import ECS from "../ECS";
import KinematicsComponent from "../Components/KinematicsComponent";
import { vec3 } from "gl-matrix";

const KinematicsSystem: System = function (ecs: ECS, delta: number): void {
	for (const entity of ecs.entities.values()) {
		const kine = entity.components[KinematicsComponent.key];
		if (!kine)
			continue;
		vec3.scale([0, 0, 0], kine.a, delta);
		const deltaV = vec3.scale(
			[0, 0, 0],
			kine.a,
			delta
		);
		vec3.add(kine.v, kine.v, deltaV);
		const deltaD = vec3.scale(
			[0, 0, 0],
			kine.v,
			delta
		);
		vec3.add(kine.d, kine.d, deltaD);
		if (vec3.sqrLen(kine.v) > 0.00001) // avoid errors when 0 < v <<< 1
			vec3.normalize(kine.direction, kine.v);
	}
}

export default KinematicsSystem;
