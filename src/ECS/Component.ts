import Entity from "./Entity";

export default interface Component {
	readonly key: string;
	print(): void;
	[key: string]: any;
}

export class BaseComponent implements Component {
	static readonly key: string = 'BaseComponent';
	readonly key: string = BaseComponent.key;

	print(): void {
		console.log(JSON.stringify(this, null, 4));
	}
}
