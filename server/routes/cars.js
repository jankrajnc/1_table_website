const express = require('express');
const router = express.Router();
//const db = require('../db');

const mysql = require('mysql');

const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'car_register'
});

/*router.get('/', async (req, res) => {
  const { rows } = await db.query(`SELECT * FROM car_register.car ORDER BY id ASC;`, null);
  res.json(rows[0]);
})*/

// GET - Get all cars.
router.get("/", async (req, res) => {
  try {
    mySqlConnection.query(`SELECT * FROM car_register.car ORDER BY id ASC;`, function (err, results) {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json(error);
  }
});

// GET - Get all cars.
router.get("/", function (req, res) {
  try {
    mySqlConnection.query(`SELECT * FROM car_register.car ORDER BY id ASC;`, function (err, results) {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json(error);
  }
});

// GET - Get a car based on the provided ID.
router.get("/:id", function (req, res) {
  try {
    const id = req.params.id;
    mySqlConnection.query(`SELECT * FROM car_register.car WHERE id=${id};`, function (err, results) {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json(error);
  }
});

// POST - Create a new car.
router.post('/', function (req, res) {
  try {
    mySqlConnection.query(`INSERT INTO car_register.car SET ?;`, req.body, function (err, results) {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json(error);
  }
})

// PUT - Update a car based on the provided ID.
router.put('/:id', function (req, res) {
  try {
    const id = req.params.id;
    mySqlConnection.query(`UPDATE car_register.car SET ? WHERE id=${id};`, req.body, function (err, results) {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json(error);
  }
})

// DELETE - Delete a car based on the provided ID.
router.delete("/:id", function (req, res) {
  try {
    let id = req.params.id;
    mySqlConnection.query(`DELETE FROM car_register.car WHERE id=${id};`, function (err, results) {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;
