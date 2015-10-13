/**
 * entry point of our configurations
 */

//currently only one environment

var conf = {
    db: {
        connectUrl: 'postgres://postgres:postgres@localhost:5432/cat-manager',
        dialect: 'postgres'
    },
    isRESTInterface: false //define that manager will respond on rest crud command
};


module.exports = conf;