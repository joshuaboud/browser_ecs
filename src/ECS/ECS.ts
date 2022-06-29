import Entity from "./Entity";
import System from "./System";

class ECS {
	entities: Array<Entity> = [];
	systems: Array<System> = [];
	running: boolean = true;
	tick: number = 0;
	constructor() {

	}

	registerEntities(...entities: Array<Entity>): ECS {
		this.entities.push(...entities);
		return this;
	}

	registerSystem(...systems: Array<System>): ECS {
		this.systems.push(...systems);
		return this;
	}

	gameLoop() {
		const delta = Date.now() - this.tick;
		this.tick += delta;
		const systemsCount = this.systems.length;
		for (let i = 0; i < systemsCount; i++) {
			const system = this.systems[i];
			const relevantComponents = this.systems[i].relevantComponents ?? [];
			const relevantEntities = system.relevantComponents
				? this.entities
					.filter(entity =>
						relevantComponents
							.some(component =>
								component in entity.components))
				: this.entities;
			system(relevantEntities, delta);
		}

		if (this.running !== false) {
			requestAnimationFrame(() => this.gameLoop());
		}
	}

	run(): void {
		this.tick = Date.now();
		requestAnimationFrame(() => this.gameLoop());
	}
}

export default ECS;
