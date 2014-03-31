/**
 * route
 */

var store = require('../lib/store');


function createTestUser(req, res) {
    var user = store.getModel('user');

    user.create({firstName: "kostya", lastName: "Kovtushenko"})
        .success(function(user){
            res.json(user.values);
        })
        .failure(function(err){
            res.json(err);
        });
    console.log(user);
}

function bindRoutes(app){
    //bind all controllers
    app.get('/manager/user/test', createTestUser);
}

module.exports = bindRoutes;   //todo create more clear routing (it would be better to have all routes in one separate place)