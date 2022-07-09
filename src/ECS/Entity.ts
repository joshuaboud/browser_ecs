import UniqueIDGenerator from "./UniqueIDGenerator";

export interface IEntityComponents {
}

type ComponentTypeUnion = Exclude<IEntityComponents[keyof IEntityComponents], undefined>;
type ComponentsSymbolIndex = {[key:symbol]: ComponentTypeUnion}

export default class Entity {
	id: number;
	components: IEntityComponents;
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

	addComponent(component: Exclude<IEntityComponents[keyof IEntityComponents], undefined>): Entity {
		(this.components as ComponentsSymbolIndex)[component.key()] = component;
		return this;
	}

	removeComponent(component: symbol | Exclude<IEntityComponents[keyof IEntityComponents], undefined>): Entity {
		const key = typeof component === 'symbol' ? component : component.key();
		delete (this.components as ComponentsSymbolIndex)[key];
		return this;
	}

	print(): Entity {
		console.log(JSON.stringify(this, null, 4));
		return this;
	}
}
