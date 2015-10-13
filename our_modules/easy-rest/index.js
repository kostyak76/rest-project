/**
 *  this is an entry point of the "easy-rest"
 */

/*dependencies*/
var Sequelize = require('sequelize'),
    chainer = new Sequelize.Utils.QueryChainer,
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

/*vars*/
var MODELS = {},
    ASSOCIATIONS = {},
    seqLize;

//routes
//service

//todo add logger somehow

/**
 * init library
 *
 * expect config to be like
 * {
 *
 * }
 * @param {Object} config
 */
exports.init = function (config) {
    //init sequelize
    seqLize = new Sequelize(config.datastore);
    //init models

};
//create models
//create routes