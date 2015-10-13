/**
 * our storage here
 */


/* dependencies */
var Sequelize = require('sequelize'),
    config = require('../../.'),
    chainer = new Sequelize.Utils.QueryChainer,
    dbConfig = config.db,
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');


/* globals */
var currentPath = path.dirname(module.filename),
    MODELS = {},
    ASSOCIATIONS = {};


/*init db*/
var seqLize = new Sequelize(dbConfig.connectUrl);


/*init models*/
var modelFiles = fs.readdirSync(path.join(currentPath, '../models'));

_.each(modelFiles, function (_model) {
    var rawModel = require(path.join(currentPath, "../models", _model)),
        build = rawModel.build,
        key = _model.replace('.js','');

    //extend MODELS
    MODELS[key] = build(seqLize, Sequelize);

    //extend ASSOCIATIONS
    ASSOCIATIONS[key] = rawModel.associations;
});


/*init model associations*/
_.each(ASSOCIATIONS, function(associations, key){
    _.each(associations, function(association){
        var method = association[0];
        var otherName = association[1];
        var options = association[2];
        MODELS[key][method](MODELS[otherName], options);
    });
});


//sync db
seqLize.sync()
    .error(function (err) {
        throw err;
    });


module.exports = {
    chainer: chainer,
    getModel: function(key){
        return MODELS[key];
    },
    getModelKeys: function(){
        return _.keys(MODELS);
    }
};