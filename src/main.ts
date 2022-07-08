import './style.css'
import ECS from './ECS/ECS';
import Entity from './ECS/Entity';
import AppearanceComponent from './ECS/Components/AppearanceComponent';
import CameraComponent from './ECS/Components/CameraComponent';
import RenderSystem from './ECS/Systems/RenderSystem';
import KeyboardMovementComponent from './ECS/Components/KeyboardMovementComponent';
import KeyboardInputSystem from './ECS/Systems/KeyboardInputSystem';
import KinematicsSystem from './ECS/Systems/KinematicsSystem';
import KinematicsComponent from './ECS/Components/KinematicsComponent';
import PositionPDComponent from './ECS/Components/PositionPDComponent';
import VelocityPDComponent from './ECS/Components/VelocityPDComponent';
import PDSystem from './ECS/Systems/PDSystem';
import TrackerSystem from './ECS/Systems/TrackerSystem';
import PositionTrackerComponent from './ECS/Components/PostionTrackerComponent';
import KeyboardEventComponent from './ECS/Components/KeyboardEventComponent';

const app = document.querySelector<HTMLDivElement>('#app')!

const cnv = document.createElement('canvas');
cnv.style.position = 'fixed';
cnv.style.top = '0';
cnv.style.left = '0';
cnv.style.right = '0';
cnv.style.bottom = '0';
const ctx = cnv.getContext('2d');
if (!ctx)
	throw new Error('Failed to get canvas context');

ctx.imageSmoothingEnabled = false;

let width: number, height: number;
cnv.width = (width = window.innerWidth);
cnv.height = (height = window.innerHeight);
const cameraComponent = new CameraComponent(ctx, width, height);
window.addEventListener('resize', (_event) => {
	cnv.width = (cameraComponent.width = window.innerWidth);
	cnv.height = (cameraComponent.height = window.innerHeight);
})

app.appendChild(cnv);

const playerSprite = new Image();

const player = new Entity()
	.addComponent(new KinematicsComponent([width / 2, height / 2]))
	.addComponent(new KeyboardMovementComponent(0.15, 'v'))
	.addComponent(new VelocityPDComponent(0.0075, 0, [0, 0, 0]));
	// .addComponent(new PositionPDComponent(0.005, 0, [width / 2, height / 2, 0]))

playerSprite.onload = () =>
	createImageBitmap(playerSprite)
		.then(bm =>
			player.addComponent(new AppearanceComponent(bm, bm.width, bm.height)));

playerSprite.src = 'assets/player.png';

const camera = new Entity()
	.addComponent(new KinematicsComponent([width / 2, height / 2]))
	.addComponent(new PositionTrackerComponent(player.id, [30, 0, 0], true, 0.25))
	.addComponent(cameraComponent);

const light = new Entity()
	.addComponent(new KinematicsComponent([width / 2, height / 2]))
	.addComponent(new PositionTrackerComponent(player.id, [15, 0, 0], true, 0.5))
	.addComponent(new KeyboardEventComponent((entity, event) => {
		if (event.key === ' ' && event.type === 'keydown') {
			const appearance = entity.components[AppearanceComponent.key];
			if (appearance) {
				appearance.hidden = !appearance.hidden;
			}
		}
	}))

const ecs = new ECS()
	.registerEntities(player, camera, light)
	.registerSystem(KeyboardInputSystem, PDSystem, KinematicsSystem, TrackerSystem, RenderSystem);

// ecs.keyEvents.sub(' ', (val) => {
// 	if (!val)
// 		return;
// 	const kine = player.components[KinematicsComponent.key];
// 	if (!kine)
// 		return;
// 	kine.v[1] = -100;
// 	kine.a[1] = 98.1;
// })

const starSprite = new Image();
starSprite.onload = () =>
	createImageBitmap(starSprite)
		.then(bm => {
			light.addComponent(new AppearanceComponent(bm, bm.width, bm.height));
			const stars = [];
			for (let i = 0; i < 3000; i++) {
				stars.push(new Entity()
					.addComponent(new KinematicsComponent([Math.floor((Math.random() * width * 4) - width), Math.floor((Math.random() * height * 4) - height)]))
					.addComponent(new AppearanceComponent(bm, bm.width, bm.height)));
			};
			ecs.registerEntities(...stars);
		});

starSprite.src = 'assets/star.png';

ecs.run();
