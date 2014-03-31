/**
 * manager routes
 */

/*dependencies*/
var async = require('async'),
    _util = require('../lib/util'),
    store = require('../lib/store'),
    _ = require('underscore');

/*global vars*/
var managerName = 'manager',
    startPage = 1,
    limitItems = 100;

/**
 * this function get model by 'entity' in params
 *
 * @param {Object} req Request object
 * @param {Function} cb Callback function
 * @private
 */
function _getModel(req, cb) {
    var modelName = req.params.entity,
        model = store.getModel(modelName);

    var err = (typeof model === 'undefined')
        ? new _util.Error404("model not found")
        : null;
    async.nextTick(function () {
        cb(err, model);
    });
}

/*create new entity*/
function _create(req, res) {

    async.waterfall([
        //get model
        //model validation runs with build/create
        async.apply(_getModel, req),

        //save entity
        function (model, cb) {
            _util.eventEmitterToAsync(model.create(req.body), function (err, result) {
                if (result) {
                    result = result.values;
                }
                cb(err, result);
            });
        }

    ], res.getResponseWriter());
}

/*return entity by id*/
function _read(req, res) {      //todo add association objects (variant - as additional collection of such entities)
    async.waterfall([
        async.apply(_getModel, req),

        //give entity
        function (model, cb) {
            _util.eventEmitterToAsync(model.find(req.params.id), function (err, entity) {
                if (entity) {
                    entity = entity.values;   //todo check for childes and add them as object
                }
                cb(err, entity);
            }); //todo make sanitizing
        }

    ], res.getResponseWriter());
}

/*update entity*/
function _update(req, res) {
    async.waterfall([
        async.apply(_getModel, req),

        function (model, cb) {
            _util.eventEmitterToAsync(model.find(req.params.id), cb); //todo make sanitizing
        },

        function (entity, cb) {
            _.extend(entity, req.body);
            _util.eventEmitterToAsync(entity.save(), cb);
        }
    ], res.getResponseWriter({message: "entity updated successfully"}));
}

/*delete entity*/
function _delete(req, res) {
    async.waterfall([
        async.apply(_getModel, req),

        function (model, cb) {
            _util.eventEmitterToAsync(model.find(req.params.id), cb);  //todo make sanitizing
        },

        function (entity, cb) {
            _util.eventEmitterToAsync(entity.destroy(), cb);
        }

    ], res.getResponseWriter({message: "entity deleted successfully"}));
}


/*search entities*/
function _search(req, res) {   //todo add child object
    var page = req.query.page || startPage,      //todo better validations
        limit = req.query.limit || limitItems;

    async.waterfall([

        async.apply(_getModel, req),

        function (model, cb) {

            //pick only model keys
            var constraint = _.pick(req.query, _.keys(model.rawAttributes));
            //validate them
            _util.eventEmitterToAsync(
                model.findAndCountAll(
                    {where: constraint, offset: (page - 1) * limit, limit: limit}
                ), cb);

            /**
             * response example
             * "content":{
                    "count":1,
                    "rows":[
                            {
                            "id":1,
                            "name":"Mariupol",
                            "createdAt":"2014-03-31T14:36:02.819Z",
                            "updatedAt":"2014-03-31T18:05:25.596Z"
                            }
                        ]
                    }
             */
        }
    ], res.getResponseWriter());
}


function bindRoutes(app) {
    var route = ['/', managerName, '/:entity'].join('');

    //bind all controllers
    app.get(route + '/search', _search);

    app.post(route, _create);

    app.get(route + '/:id', _read);

    app.put(route + '/:id', _update);

    app.delete(route + '/:id', _delete);
}

module.exports = bindRoutes;