const express = require('express');
const router = express.Router();
const carDb = require('../db/car-db');

// GET - All entries.
router.get("/", (req, res) => {
  try {
    carDb.getCars(res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET - One entry.
router.get("/:id", function (req, res) {
  try {
    carDb.getCar(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST.
router.post('/', function (req, res) {
  try {
    carDb.createCar(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT.
router.put('/:id', function (req, res) {
  try {
    carDb.updateCar(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
})

// DELETE.
router.delete("/:id", function (req, res) {
  try {
    carDb.deleteCar(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
