export default class UniqueIDGenerator {
	id: number;
	freeIds: Array<number>;

	constructor() {
		this.id = 0;
		this.freeIds = [];
	}

	get(): number {
		if (this.id === Number.MAX_SAFE_INTEGER)
			throw new Error('Too many IDs!');
		const id = this.freeIds.pop() ?? this.id++;
		return id;
	}

	free(id: number): void {
		if (id === this.id + 1 && this.freeIds.length === 0)
			this.id--;
		else
			this.freeIds.push(id);
	}
}
