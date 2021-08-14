const express = require('express');
const router = express.Router();
const userDb = require('../db/user-db');

// POST - Sign up.
router.post('/signup', async function (req, res) {
  try {
    await userDb.signupUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST - Login.
router.post('/login', async function (req, res) {
  try {
    await userDb.loginUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST - Authorize.
router.post('/authorize', async function (req, res) {
  try {
    await userDb.authorizeUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE - TESTING USE ONLY.
router.delete("/:id", function (req, res) {
  try {
    userDb.deleteUser(req, res);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
