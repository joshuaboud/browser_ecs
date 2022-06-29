import './style.css'
import ECS from './ECS/ECS';
import Entity from './ECS/Entity';
import AppearanceComponent from './ECS/Components/AppearanceComponent';
import PositionComponent from './ECS/Components/PositionComponent';
import CameraComponent from './ECS/Components/CameraComponent';
import RenderSystem from './ECS/Systems/RenderSystem';

const app = document.querySelector<HTMLDivElement>('#app')!

const cnv = document.createElement('canvas');
cnv.style.position = 'fixed';
cnv.style.top = '0';
cnv.style.left = '0';
const ctx = cnv.getContext('2d');
if (!ctx)
	throw new Error('Failed to get canvas context');

ctx.imageSmoothingEnabled = false;


const width = cnv.width = window.innerWidth;
const height = cnv.height = window.innerHeight;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

app.appendChild(cnv);

const playerSprite = new Image();

const player = new Entity()
	.addComponent(new PositionComponent(width / 2, height / 2))
	.addComponent(new CameraComponent(ctx, width, height));

playerSprite.onload = () =>
	createImageBitmap(playerSprite)
		.then(bm =>
			player.addComponent(new AppearanceComponent(bm, bm.width * 4, bm.height * 4)));

playerSprite.src = 'assets/player.png';



const ecs = new ECS()
	.registerEntities(player)
	.registerSystem(RenderSystem);

const starSprite = new Image();
starSprite.onload = () =>
	createImageBitmap(starSprite)
		.then(bm => {
			const stars = [];
			for (let i = 0; i < 20; i++) {
				const scale = (1 - Math.random() * 0.75);
				stars.push(new Entity()
					.addComponent(new PositionComponent(Math.random() * width, Math.random() * height))
					.addComponent(new AppearanceComponent(bm, bm.width * scale, bm.height * scale)));
			};
			ecs.registerEntities(...stars);
		});

starSprite.src = 'assets/star.png';

ecs.run();
