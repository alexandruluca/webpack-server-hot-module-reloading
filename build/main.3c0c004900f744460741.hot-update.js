require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./server/chain-middleware.ts":
/*!************************************!*\
  !*** ./server/chain-middleware.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function chainMiddleware(series) {
    if (!Array.isArray(series)) {
        series = [series];
    }
    return function (req, res, next) {
        return new Promise(function (resolve, reject) {
            seriesEach(series, function (chainError, currentMiddleware, next) {
                let isErrMiddleware = currentMiddleware.length === 4;
                console.log('has error', chainError instanceof Error);
                if (chainError instanceof Error && !isErrMiddleware) {
                    console.log('call next');
                    return next();
                }
                else if (!chainError && isErrMiddleware) {
                    return next();
                }
                let args = [req, res, next];
                if (chainError) {
                    args.unshift(chainError);
                }
                try {
                    currentMiddleware.apply(undefined, args);
                }
                catch (err) {
                    reject(err);
                }
            }, () => {
                resolve();
                next && next();
            });
        });
    };
}
exports.chainMiddleware = chainMiddleware;
function seriesEach(arr, iterator, callback) {
    callback = callback || function () { };
    if (!Array.isArray(arr) || !arr.length) {
        return callback();
    }
    var completed = 0;
    var chainError;
    var iterate = function () {
        iterator(chainError, arr[completed], function (err) {
            ++completed;
            if (err instanceof Error) {
                chainError = err;
            }
            if (completed >= arr.length) {
                callback();
            }
            else {
                nextTick(function () {
                    iterate.apply(undefined);
                });
            }
        });
    };
    iterate();
}
;
function nextTick(cb) {
    if (typeof setImmediate === 'function') {
        setImmediate(cb);
    }
    else {
        process.nextTick(cb);
    }
}


/***/ })

};
//# sourceMappingURL=main.3c0c004900f744460741.hot-update.js.map