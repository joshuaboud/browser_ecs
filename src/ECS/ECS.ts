import Entity from "./Entity";
import System from "./System";

let eventTally = 0;

class ECS {
	entities: Map<number, Entity> = new Map();
	systems: Array<System> = [];
	running: boolean = true;
	tick: { start: number | undefined, last: number } = { start: undefined, last: 0 };
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

	gameLoop(ts: number) {
		if (this.tick.start === undefined)
			this.tick.start = ts;
		const frameMilliseconds = ts - this.tick.last;
		this.tick.last = ts;
		const systemsCount = this.systems.length;
		for (let i = 0; i < systemsCount; i++) {
			this.systems[i](this, frameMilliseconds);
		}
		if (this.running !== false) {
			requestAnimationFrame(this.gameLoop.bind(this));
		}
	}

	run(): void {
		requestAnimationFrame(this.gameLoop.bind(this));
	}
}

export default ECS;
