import Component from "./Component";
import UniqueIDGenerator from "./UniqueIDGenerator";

export default class Entity {
	id: number;
	components: { [key: string]: Component };
	static count = 0;
	public static idGenerator: UniqueIDGenerator = new UniqueIDGenerator();

	constructor() {
		this.id = Entity.idGenerator.get();
		this.components = {};
		Entity.count++;
	}

	destroy() {
		this.components = {};
		Entity.idGenerator.free(this.id);
		Entity.count--;
	}

	addComponent(component: Component): Entity {
		this.components[component.key] = component;
		return this;
	}

	removeComponent(component: string|Component): Entity {
		const key = typeof component === 'string' ? component : component.key;
		delete this.components[key];
		return this;
	} 

	print(): Entity {
		console.log(JSON.stringify(this, null, 4));
		return this;
	}
}
