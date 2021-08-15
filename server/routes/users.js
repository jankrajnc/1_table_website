const express = require('express');
const router = express.Router();
const userDb = require('../db/user-db');

// POST - Sign up.
router.post('/signup', async function (req, res) {
  await userDb.signupUser(req, res);
});

// POST - Login.
router.post('/login', async function (req, res) {
  await userDb.loginUser(req, res);
});

// POST - Authorize.
router.post('/authorize', async function (req, res) {
  await userDb.authorizeUser(req, res);
});

// DELETE - TESTING USE ONLY.
router.delete("/:id", function (req, res) {
  userDb.deleteUser(req, res);
});

module.exports = router;
