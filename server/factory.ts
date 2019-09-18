import fastify from "fastify";
import Cookies from "cookies";
import multer from 'multer';
const multer = require('fastify-multer') // or import multer from 'fastify-multer'
import url from "url";
import {Router} from "./Router";
import {chainMiddleware} from "./chain-middleware";

class Application {
    httpServer;
    app;
    router;

    constructor(router: Router) {
        this.app = fastify();
		// By default, the Server's timeout value is 2 minutes, and sockets are destroyed automatically if they time out.
		// However, if you assign a callback to the Server's 'timeout' event, then you are responsible for handling socket timeouts.
		// server.timeout = 0; // no limit
		this.app.server.setTimeout(0);
		this.app.register(multer.contentParser);
		this.app.use('/', this.preRequestHandler);
		this.app.addHook('preHandler', this.preRequestHandler);

		this.setRoutes(router);
    }
    
    setRoutes(router) {
        let routes = router.getRoutes();

		for (let method in routes) {
			for (let path in routes[method]) {
				let middleware = routes[method][path];

				if (middleware.length > 1) {
					this.app[method](path, chainMiddleware(middleware));
				} else {
					this.app[method](path, middleware[0]);
				}
			}
		}
    }

    private preRequestHandler(req, res, next) {
        req.res = res;

        // served using fastify routes
        if (req.raw) {
            ['session', 'url'].forEach(prop => {
                req[prop] = req.raw[prop];
            });

            req.get = function (key) {
                return req.headers[key];
            };

            res.setHeader = res.header;
        } else { // served using use from http server
            req._cookies = new Cookies(req, res);
            req.req = req; // mimic fastify wrapped request

            if (!req.query) {
                req.query = url.parse(req.url, true).query;
            }
        }

        let cookies = req._cookies || (req.raw && req.raw._cookies);

        res.getCookie = function () {
            cookies.get.apply(cookies, arguments);
            return res;
        };
        res.setCookie = function () {
            cookies.set.apply(cookies, arguments);
            return res;
        };

        res.status = function (statusCode) {
            res.statusCode = statusCode;
            return res;
        };

        next();
    }

    listen(port) {
        this.app.listen(port, (err, address) => {
            if (err) throw err
            console.log(`server listening on ${address}`)
        })
        //this.app.listen(port);
        //return this.httpServer ? this.httpServer.listen(port) : undefined;
    }

    close() {
        return this.app.close();
        return this.httpServer ? this.httpServer.close() : undefined;
    }
};

export function getInstance(router) {
    return new Application(router);
}