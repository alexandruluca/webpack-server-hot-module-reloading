require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./server/server.ts":
/*!**************************!*\
  !*** ./server/server.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __webpack_require__(/*! ./Router */ "./server/Router.ts");
const router = new Router_1.Router();
router.use([function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next(new Error('catched error'));
        });
    }, (req, res, next) => {
        console.log('next 2');
        next();
    }]);
router.use(function (req, res, next) {
    console.log('next 3');
    next();
});
router.get('/json', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('call json');
        res.send({ success: true });
    });
});
router.use((err, req, res, next) => {
    res.end({ success: true, message: `err: ${err.message} catched` });
});
function getRouter() {
    return __awaiter(this, void 0, void 0, function* () {
        return router;
    });
}
exports.getRouter = getRouter;


/***/ })

};
//# sourceMappingURL=main.45a9380ae2f0ff5e3fbf.hot-update.js.map