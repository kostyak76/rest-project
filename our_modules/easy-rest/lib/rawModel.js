/**
 * this is helper to prepare model
 *
 */

/*dependencies*/
var DataTypes = require('sequelize');


var _options = {};


/**
 * associations here
 *
 * @type {Array.<{method, associatedModel, options}>} //todo use jsDoc notation
 */
var _associations = [];

/**
 * instantiate model
 *
 * @param {String} name Name of the model
 * @param {Object} attributes Model Attributes
 * @param {Object} options Model Options
 * @param {Array} associations Array of array. Each of them defines association pattern //todo use jsDoc notation
 * @returns {{name: String, build: Function, associations: (*|Array.<{method, associatedModel, options}>)}}
 */
var newInstance = function (name, attributes, options, associations){
    return {
        name: name,
        build: function (seqLize, DataTypes) {
            var options = options || _options;
            return seqLize.define(name, attributes, options);
        },
        associations: associations || _associations
    }
};

module.exports = {
    newInstance: newInstance,
    DataTypes: DataTypes
};