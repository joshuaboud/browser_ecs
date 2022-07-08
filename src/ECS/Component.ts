export default class BaseComponent {
	readonly key: symbol = Symbol();

	print(): void {
		console.log(JSON.stringify(this, null, 4));
	}
}
