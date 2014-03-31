/**
 * entry point of our configurations
 */

//currently only one environment

var conf = {
    db: {
        connectUrl: 'postgres://postgres:postgres@localhost:5432/cat-manager',
        dialect: 'postgres'
    }
};


module.exports = conf;