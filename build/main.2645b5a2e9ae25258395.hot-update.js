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
                if (chainError instanceof Error && !isErrMiddleware) {
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
            }, (err) => {
                if (err) {
                    res.end(JSON.stringify({ success: false, message: err.message }));
                    resolve();
                }
                else {
                    resolve();
                    next && next();
                }
            });
        });
    };
}
exports.chainMiddleware = chainMiddleware;
function seriesEach(arr, iterator, doneCallback) {
    doneCallback = doneCallback || function () { };
    if (!Array.isArray(arr) || !arr.length) {
        return doneCallback();
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
                if (chainError) {
                    chainError.message = `no error handler middleware was provided: ${chainError.message}`;
                }
                doneCallback(chainError);
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
//# sourceMappingURL=main.2645b5a2e9ae25258395.hot-update.js.map