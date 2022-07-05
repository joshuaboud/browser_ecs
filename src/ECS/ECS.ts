import Entity from "./Entity";
import System from "./System";

let eventTally = 0;

class ECS {
	entities: Map<number, Entity> = new Map();
	systems: Array<System> = [];
	running: boolean = true;
	tick: number = 0;
	keysHeld: { [key: string]: boolean } = {};
	keyEvents: KeyboardEvent[] = [];
	constructor() {
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			if (!event.repeat && !this.keysHeld[event.key]) {
				eventTally++;
				console.log('ECS events received', eventTally);
				this.keyEvents.push(event);
			}
			this.keysHeld[event.key] = true;
		}, { passive: true });
		window.addEventListener('keyup', (event: KeyboardEvent) => {
			if (!event.repeat && this.keysHeld[event.key]) {
				eventTally++;
				console.log('ECS events received', eventTally);
				this.keyEvents.push(event);
			}
			this.keysHeld[event.key] = false;
		}, { passive: true });
	}

	registerEntities(...entities: Array<Entity>): ECS {
		for (let i = 0; i < entities.length; i++) {
			this.entities.set(entities[i].id, entities[i]);
		}
		return this;
	}

	removeEntities(...entitiesOrIds: Array<Entity | number>): void {
		for (let i = 0; i < entitiesOrIds.length; i++) {
			const entityOrId = entitiesOrIds[i];
			let entity: Entity | null;
			if (entityOrId instanceof Entity) {
				entity = entityOrId;
			} else {
				entity = this.entities.get(entityOrId) ?? null;
			}
			if (!entity)
				return;
			entity.destroy();
			this.entities.delete(entity.id);
		}
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
			this.systems[i](this, delta);
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
