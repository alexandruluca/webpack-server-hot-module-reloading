import serverStatic from 'serve-static';
import _ from "lodash";

interface IRoute {
	[key: string]: (req, res, next) => any;
}

export interface IRouter {
	use?: IRoute[];
	get?: IRoute[];
	put?: IRoute[];
	post?: IRoute[];
	options?: IRoute[]
	delete?: IRoute[];
}

export class Router {
	private routes: IRouter = {};

	public getRoutes() {
		return this.routes;
	}

	public get(path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		this.applyRoute('get', path, middleware);
	}

	public head(path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		this.applyRoute('head', path, middleware);
	}

	public put(path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		this.applyRoute('put', path, middleware);
	}

	public post(path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		this.applyRoute('post', path, middleware);
	}

	public delete(path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		this.applyRoute('delete', path, middleware);
	}

	public options(path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		this.applyRoute('options', path, middleware);
	}

	public use(middleware: ((req, res, next) => any) | ((req, res, any) => any)[] | Router, path: string = '/') {
		if (middleware instanceof Router) {
			this.applyRouter(middleware);
			return;
		}

		this.applyRoute('use', path, middleware);
	}

	public static(path: string, assetPath: string) {
		this.applyRoute('use', path, serverStatic(assetPath));
	}

	private applyRoute(method: string, path: string, middleware: ((req, res, next) => any) | ((req, res, any) => any)[]) {
		if (!(Array.isArray(middleware))) {
			middleware = [middleware];
		}

		this.routes[method] = this.routes[method] || {};
		let existingMiddleware = this.routes[method][path];

		if (existingMiddleware) {
			existingMiddleware.push.apply(existingMiddleware, middleware);

			this.routes[method][path] = existingMiddleware;
		} else {
			this.routes[method][path] = middleware;
		}
	}

	private applyRouter(router: Router) {
		_.defaultsDeep(this.routes, router.routes);
	}
}