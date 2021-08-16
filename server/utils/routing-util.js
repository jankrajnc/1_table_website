//The idea is to load all the routes here, so that the app.js is less cluttered. 
const index = require('../routes/index');
const cars = require('../routes/cars');
const users = require('../routes/users');

function mountRoutes(app) {
  app.use('/', index);
  app.use('/cars', cars);
  app.use('/users', users);
}

module.exports.mountRoutes = mountRoutes;
