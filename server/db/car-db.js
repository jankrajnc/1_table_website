const mysql = require('mysql');

// Pooling is superior so this is not used.
/*const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'car_register'
});*/

const mySqlPool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'car_register'
});

// Get all cars, sort by ascending IDs.
function getCars(res) {
    mySqlPool.query(`SELECT * FROM car_register.car ORDER BY id ASC;`, function (error, results) {
        if (error) throw error;
        res.json(results);
    });
}

// Get a car based on the provided ID.
function getCar(req, res) {
    mySqlPool.query(`SELECT * FROM car_register.car WHERE id=?;`, [req.params.id], function (error, results) {
        if (error) throw error;
        res.json(results);
    });
}

// Create a new car.
function createCar(req, res) {
    mySqlPool.query(`INSERT INTO car_register.car SET ?;`, req.body, function (error, results) {
        if (error) return res.status(400).send("Invalid POST data");
        res.json(results);
    });
}

// Update a car based on the provided ID and updated car data contained in req.body.
function updateCar(req, res) {
    mySqlPool.query(`UPDATE car_register.car SET ? WHERE id=?;`, [req.body, req.params.id], function (error, results) {
        if (error) { return res.status(400).send("Invalid PUT data"); }
        res.json(results);
    });
}

// Delete a car based on the provided ID.
function deleteCar(req, res) {
    // An alternative way of preventing SQL injections.
    mySqlPool.query(`DELETE FROM car_register.car WHERE id=${mySqlPool.escape(req.params.id)};`, function (error, results) {
        if (error) throw error;
        res.json(results);
    });
}

module.exports = {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}