import System from "../System";
import AppearanceComponent from "../Component/Components/AppearanceComponent";
import CameraComponent from "../Component/Components/CameraComponent";
import ECS from "../ECS";
import KinematicsComponent from "../Component/Components/KinematicsComponent";

let FPS: number;

const RenderSystem: System = function (ecs: ECS, delta: number): void {
	for (const cameraEntity of ecs.entities.values()) {
		const camera = cameraEntity.components[CameraComponent.key];
		if (!camera)
			continue;
		const cameraPosition = cameraEntity.components[KinematicsComponent.key];
		if (!cameraPosition)
			throw new Error('Camera has no position component!');
		const cameraXOffset = -1 * (cameraPosition.d[0] - camera.width / 2);
		const cameraYOffset = -1 * (cameraPosition.d[1] - camera.height / 2);
		camera.ctx.fillStyle = 'black';
		camera.ctx.fillRect(0, 0, camera.width, camera.height);
		camera.ctx.imageSmoothingEnabled = false;
		for (const entity of ecs.entities.values()) {
			const appearance = entity.components[AppearanceComponent.key];
			if (!appearance || appearance.hidden)
				continue;
			const kine = entity.components[KinematicsComponent.key];
			if (!kine)
				throw new Error('Entity with appearance component has no kinematics component!');
			camera.ctx.drawImage(
				appearance.sprite,
				Math.floor(kine.d[0] - appearance.width / 2 + cameraXOffset),
				Math.floor(kine.d[1] - appearance.height / 2 + cameraYOffset),
				appearance.width,
				appearance.height,
			);
			const FPSinst = 1000 / delta;
			FPS = FPSinst * 0.0000125 + (FPS ?? FPSinst) * (1 - 0.0000125);
			camera.ctx.fillStyle = 'lightblue';
			camera.ctx.font = '16pt monospace'
			camera.ctx.fillText(`FPS: ${Math.round(FPS)}`, 10, 25);
		}
	}
}

export default RenderSystem;
