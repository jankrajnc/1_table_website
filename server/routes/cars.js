const express = require('express');
const router = express.Router();
const carDb = require('../db/car-db');

// GET - All entries.
router.get("/", (req, res) => {
  carDb.getCars(res);
});

// GET - One entry.
router.get("/:id", function (req, res) {
  carDb.getCar(req, res);
});

// POST.
router.post('/', function (req, res) {
  carDb.createCar(req, res);
});

// PUT.
router.put('/:id', function (req, res) {
  carDb.updateCar(req, res);
});

// DELETE.
router.delete("/:id", function (req, res) {
  carDb.deleteCar(req, res);
});

module.exports = router;
