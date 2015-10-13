/*utils*/

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
    eventEmitterToAsync: eventEmitterToAsync
};