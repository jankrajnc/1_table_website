const mysql = require('mysql');
const logger = require("../utils/log-util").getLogger();

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
    try {
        mySqlPool.query(`SELECT * FROM car_register.car ORDER BY id ASC;`, function (error, results) {
            if (error) {
                logger.error(JSON.stringify(error));
                res.status(400).json(error);
            }
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Get a car based on the provided ID.
function getCar(req, res) {
    try {
        mySqlPool.query(`SELECT * FROM car_register.car WHERE id=?;`, [req.params.id], function (error, results) {
            if (error) {
                logger.error(JSON.stringify(error));
                res.status(400).json(error);
            }
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Create a new car.
function createCar(req, res) {
    try {
        mySqlPool.query(`INSERT INTO car_register.car SET ?;`, req.body, function (error, results) {
            if (error) {
                logger.error(JSON.stringify(error));
                res.status(400).json(error);
            }
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Update a car based on the provided ID and updated car data contained in req.body.
function updateCar(req, res) {
    try {
        mySqlPool.query(`UPDATE car_register.car SET ? WHERE id=?;`, [req.body, req.params.id], function (error, results) {
            if (error) {
                logger.error(JSON.stringify(error));
                res.status(400).json(error);
            }
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Delete a car based on the provided ID.
function deleteCar(req, res) {
    try {
        mySqlPool.query(`DELETE FROM car_register.car WHERE id=${mySqlPool.escape(req.params.id)};`, function (error, results) {
            if (error) {
                logger.error(JSON.stringify(error));
                res.status(400).json(error);
            }
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

module.exports = {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}