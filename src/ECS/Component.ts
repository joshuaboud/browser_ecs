export default class BaseComponent {
	print(): void {
		console.log(JSON.stringify(this, null, 4));
	}
}
