import System from "../System";
import ECS from "../ECS";
import KinematicsComponent from "../Components/KinematicsComponent";
import { vec3 } from "gl-matrix";

const KinematicsSystem: System = function (ecs: ECS, delta: number): void {
	for (const entity of ecs.entities.values()) {
		const kine = entity.components.get(KinematicsComponent.key) as KinematicsComponent | undefined;
		if (!kine)
			continue;
		vec3.scale(vec3.create(), kine.a, delta);
		const deltaV = vec3.scale(
			vec3.create(),
			kine.a,
			delta
		);
		vec3.add(kine.v, kine.v, deltaV);
		const deltaD = vec3.scale(
			vec3.create(),
			kine.v,
			delta
		);
		vec3.add(kine.d, kine.d, deltaD);
	}
}

export default KinematicsSystem;
