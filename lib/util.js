/**
 * our utils
 */

/*dependencies*/
var _ = require('underscore'),
    EventEmitter = require('events').EventEmitter;

/*global vars*/
var responseBody = {
    code: null,
    isError: null, //boolean
    errorMessages: [],
    content: {} //object
};

/**
 * get clone of responseBody
 *
 * @returns {*}
 */
function getResponseBody() {
    return _.clone(responseBody);
}

/*error400 definition*/
function Error400(message) {
    var defaultMessage = 'wrong data specified';
    this.message = message || defaultMessage;
}

Error400.prototype = new Error();
Error400.prototype.constructor = Error400;


/*error404 definition*/
function Error404(message) {
    var defaultMessage = 'object does not exists';
    this.message = message || defaultMessage;
}

Error404.prototype = new Error();
Error404.prototype.constructor = Error404;

/**
 * produce common responder for controllers
 *
 * @param {Object} res Response object
 * @param {Object} content Content body
 */
function _getResponseWriter(res, content) {

    return function (err, results) {
        var body = {};
        if (err) {
            var code = 500,
                errorMessages = (err instanceof Error) ? [err.message] : [err];

            if (err instanceof Error400) {
                code = 400;
            } else if (err instanceof  Error404) {
                code = 404;
            }
            body = _.extend(getResponseBody(), {errorMessages: errorMessages, code: code, isError: true});
            res.json(code, body);
            return;
        }

        body = _.extend(getResponseBody(), {content: content || results, code: code, isError: false});
        res.json(200, body);
    };
}

/**
 * this middleware
 * add method getResponseWriter to res object
 *
 * @param req
 * @param res
 * @param next
 */
function getResponseWriterMiddleware(req, res, next) {
    if ("getResponseWriter" in res) {
        next();
        return;
    }

    res.getResponseWriter = function (content) {
        return _getResponseWriter(res, content);
    };

    next();
}

/**
 * adapter to use EventEmitter object as an ordinary async method
 *
 * @param {EventEmitter} emitter
 * @param {Function} cb Callback function
 */
function eventEmitterToAsync(emitter, cb){
    emitter
        .success(function(result){
            cb(null, result);
        })
        .error(cb);
}

module.exports = {
    Error400: Error400,
    Error404: Error404,
    eventEmitterToAsync: eventEmitterToAsync,
    getResponseWriterMiddleware: getResponseWriterMiddleware
};