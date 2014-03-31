/**
 * model
 */

/*dependencies*/
var rawModel = require('../lib/rawModel'),
    DataTypes = rawModel.DataTypes,
    userName = require('./user').name;


var name = "city";


var attributes = {
    name: DataTypes.STRING
};

/**
 * associations here
 *
 * @type {Array.<{method, associatedModel, options}>}
 */
var associations = [
    ['hasMany', userName, {onDelete: 'restrict'}]
];

module.exports = rawModel.newInstance(name, attributes, null, associations);