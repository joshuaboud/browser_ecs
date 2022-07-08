import AppearanceComponent from "./Components/AppearanceComponent";
import UniqueIDGenerator from "./UniqueIDGenerator";
import BaseComponent from "./Component";
import CameraComponent from "./Components/CameraComponent";
import KeyboardEventComponent from "./Components/KeyboardEventComponent";
import KeyboardMovementComponent from "./Components/KeyboardMovementComponent";
import KinematicsComponent from "./Components/KinematicsComponent";
import PositionComponent from "./Components/PositionComponent";
import PositionPDComponent from "./Components/PositionPDComponent";
import PositionTrackerComponent from "./Components/PostionTrackerComponent";
import VelocityPDComponent from "./Components/VelocityPDComponent";

export default class Entity {
	id: number;
	components: {
		[key: symbol]: any;
		[AppearanceComponent.key]?: AppearanceComponent;
		[CameraComponent.key]?: CameraComponent;
		[KeyboardEventComponent.key]?: KeyboardEventComponent;
		[KeyboardMovementComponent.key]?: KeyboardMovementComponent;
		[KinematicsComponent.key]?: KinematicsComponent;
		[PositionComponent.key]?: PositionComponent;
		[PositionPDComponent.key]?: PositionPDComponent;
		[PositionTrackerComponent.key]?: PositionTrackerComponent;
		[VelocityPDComponent.key]?: VelocityPDComponent;
	};
	static count = 0;
	public static idGenerator: UniqueIDGenerator = new UniqueIDGenerator();

	constructor() {
		this.id = Entity.idGenerator.get();
		this.components = {};
		Entity.count++;
	}

	destroy() {
		Entity.idGenerator.free(this.id);
		Entity.count--;
	}

	addComponent(component: BaseComponent): Entity {
		this.components[component.key] = component;
		return this;
	}

	removeComponent(component: symbol|BaseComponent): Entity {
		const key = typeof component === 'symbol' ? component : component.key;
		delete this.components[key];
		return this;
	} 

	print(): Entity {
		console.log(JSON.stringify(this, null, 4));
		return this;
	}
}
