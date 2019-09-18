import {Router} from "./Router";
import multer from "fastify-multer";
import {getMiddleware} from "./swagger";

const router = new Router();

router.use([async function(req, res, next) {
    console.log('use 1');
    return next(new Error('catched error'));
}, (req, res, next) => {
    console.log('use 2');
    next();
}]);

router.use(function(req, res, next) {
    console.log('use 3');
    next();
});


router.get('/json', async function(req, res) {
    console.log('call json');
    res.send({success: true});
});

/* router.use((err, req, res, next) => {
    res.end(JSON.stringify({success: true, message: `err: ${err.message} catched`}));
}); */

export async function getRouter() {
    return router;
}