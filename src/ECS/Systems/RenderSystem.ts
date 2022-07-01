import System from "../System";
import AppearanceComponent from "../Components/AppearanceComponent";
import PositionComponent from "../Components/PositionComponent";
import CameraComponent from "../Components/CameraComponent";
import ECS from "../ECS";

let FPS: number;

const RenderSystem: System = function (ecs: ECS, delta: number): void {
	for (const cameraEntity of ecs.entities.values()) {
		const camera = cameraEntity.components.get(CameraComponent.key) as CameraComponent | undefined;
		if (!camera)
			continue;
		const cameraPosition = cameraEntity.components.get(PositionComponent.key) as PositionComponent | undefined;
		if (!cameraPosition)
			throw new Error('Camera has no position component!');
		const cameraXOffset = -1 * (cameraPosition.x - camera.width / 2);
		const cameraYOffset = -1 * (cameraPosition.y - camera.height / 2);
		camera.ctx.fillStyle = 'black';
		camera.ctx.fillRect(0, 0, camera.width, camera.height);
		camera.ctx.imageSmoothingEnabled = false;
		for (const entity of ecs.entities.values()) {
			const appearance = entity.components.get(AppearanceComponent.key) as AppearanceComponent | undefined;
			if (!appearance)
				continue;
			const position = entity.components.get(PositionComponent.key) as PositionComponent | undefined;
			if (!position)
				throw new Error('Entity with appearance component has no position component!');
			camera.ctx.drawImage(
				appearance.sprite,
				position.x - appearance.width / 2 + cameraXOffset,
				position.y - appearance.height / 2 + cameraYOffset,
				appearance.width,
				appearance.height,
			);
			const FPSinst = 1000 / delta;
			FPS = FPSinst * 0.00005 + (FPS ?? FPSinst) * (1 - 0.00005);
			camera.ctx.fillStyle = 'lightblue';
			camera.ctx.font = '16pt monospace'
			camera.ctx.fillText(`FPS: ${Math.round(FPS)}`, 10, 25);
		}
	}
}

export default RenderSystem;
