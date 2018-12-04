const express = require('express');
const routes = express.Router();

//Route paths
let user_routes = require('./user_routes');
let champion_routes= require('./champion_routes');

routes.get('/', function (req, res) {
    res.send('Start (end)point')
});

routes.use('/',user_routes);
routes.use('/',champion_routes);

//Catch 404's 
routes.get('*', function (req, res) {
    res.status('404').json("Page not found").end()
})


module.exports = routes;