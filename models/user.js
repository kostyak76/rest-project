/**
 * model
 */

/* dependencies */
var rawModel = require('../lib/rawModel'),
    DataTypes = rawModel.DataTypes;
    

var name = 'user';


var attributes = {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
};


var classMethods = {
    //some methods should be here

};


var instanceMethods = {
    //some methods should be here

};

var options = {
    classMethods: classMethods,
    instanceMethods: instanceMethods
};

module.exports = rawModel.newInstance(name, attributes, null, null);