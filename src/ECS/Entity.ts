import Component from "./Component";
import UniqueIDGenerator from "./UniqueIDGenerator";

export default class Entity {
	id: number;
	components: Map<string, Component>;
	static count = 0;
	public static idGenerator: UniqueIDGenerator = new UniqueIDGenerator();

	constructor() {
		this.id = Entity.idGenerator.get();
		this.components = new Map();
		Entity.count++;
	}

	destroy() {
		Entity.idGenerator.free(this.id);
		Entity.count--;
	}

	addComponent(component: Component): Entity {
		this.components.set(component.key, component);
		return this;
	}

	removeComponent(component: string|Component): Entity {
		const key = typeof component === 'string' ? component : component.key;
		this.components.delete(key);
		return this;
	} 

	print(): Entity {
		console.log(JSON.stringify(this, null, 4));
		return this;
	}
}
