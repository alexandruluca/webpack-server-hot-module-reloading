import {getRouter} from './server';
import {getInstance} from "./factory";

declare const module: any;

async function bootstrap() {
	let router = await getRouter();
	const app = await getInstance(router);
	await app.listen(3000);

	if (module.hot) {
		module.hot.accept();
		console.log('disposing...')
		module.hot.dispose(() => {
			console.log('calling app.close');
			app.close();
		});
	}
}

bootstrap().catch(console.error);