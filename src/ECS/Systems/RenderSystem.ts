import System from "../System";
import Entity from "../Entity";
import AppearanceComponent from "../Components/AppearanceComponent";
import PositionComponent from "../Components/PositionComponent";
import CameraComponent from "../Components/CameraComponent";

const RenderSystem: System = function (entities: Array<Entity>, _delta: number): void {
	const { cameras, visibleEntities } = entities.reduce<{ cameras: Entity[], visibleEntities: Entity[] }>(
		(obj, entity) => {
			if (entity.components[AppearanceComponent.key])
				obj.visibleEntities.push(entity);
			if (entity.components[CameraComponent.key])
				obj.cameras.push(entity)
			return obj;
		},
		{ cameras: [], visibleEntities: [] }
	);
	const drawnEntityCount = visibleEntities.length;
	for(const camera of cameras) {
		const cameraComponent: CameraComponent = CameraComponent.getEntityComponent<CameraComponent>(camera);
		const cameraPosition: PositionComponent = PositionComponent.getEntityComponent<PositionComponent>(camera);
		const cameraXOffset = -1 * (cameraPosition.x - cameraComponent.width / 2);
		const cameraYOffset = -1 * (cameraPosition.y - cameraComponent.height / 2);
		cameraComponent.ctx.fillRect(0, 0, cameraComponent.width, cameraComponent.height);
		cameraComponent.ctx.imageSmoothingEnabled = false;
		for (let i = 0; i < drawnEntityCount; i++) {
			const entity = visibleEntities[i];
			const entityAppearance: AppearanceComponent = AppearanceComponent.getEntityComponent<AppearanceComponent>(entity);
			const entityPosition: PositionComponent = PositionComponent.getEntityComponent<PositionComponent>(entity);
			cameraComponent.ctx.drawImage(
				entityAppearance.sprite,
				entityPosition.x - entityAppearance.width / 2 + cameraXOffset,
				entityPosition.y - entityAppearance.height / 2 + cameraYOffset,
				entityAppearance.width,
				entityAppearance.height,
			);
		}
	}
}

RenderSystem.relevantComponents = [
	AppearanceComponent.key,
	PositionComponent.key,
	CameraComponent.key,
]

export default RenderSystem;
