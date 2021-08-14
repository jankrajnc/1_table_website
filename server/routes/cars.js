const express = require('express');
const router = express.Router();
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

// GET - Get all cars, sort by ascending IDs.
router.get("/", (req, res) => {
  try {
    mySqlPool.query(`SELECT * FROM car_register.car ORDER BY id ASC;`, function (error, results) {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET - Get a car based on the provided ID.
router.get("/:id", function (req, res) {
  try {
    mySqlPool.query(`SELECT * FROM car_register.car WHERE id=?;`, [req.params.id], function (error, results) {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST - Create a new car.
router.post('/', function (req, res) {
  try {
    mySqlPool.query(`INSERT INTO car_register.car SET ?;`, req.body, function (error, results) {
      //if (error) throw error;
      if (error) return res.status(400).send("Invalid POST data");
      res.json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT - Update a car based on the provided ID and updated car data contained in req.body.
router.put('/:id', function (req, res) {
  try {
    mySqlPool.query(`UPDATE car_register.car SET ? WHERE id=?;`, [req.body, req.params.id], function (error, results) {
      if (error) { return res.status(400).send("Invalid PUT data"); }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

// DELETE - Delete a car based on the provided ID.
router.delete("/:id", function (req, res) {
  try {
    // Here I'll use an alternative way of preventing SQL injections.
    mySqlPool.query(`DELETE FROM car_register.car WHERE id=${mySqlPool.escape(req.params.id)};`, function (error, results) {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
