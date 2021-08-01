const express = require('express');
const router = express.Router();
//const db = require('../db');
const authUtil = require('../utils/auth-util');
const bcrypt = require('bcrypt');

const mysql = require('mysql');

const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'car_register'
});

// POST - Create a new user.
router.post('/signup', async function (req, res) {
  try {
    // The password is hashed on the server, this means that the sending of data from the client is unsafe.
    // Generally SSL/TLS should be used for a secure connection, but I won't add it for this sample project.
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const secureData = { username: req.body.username, password: hashedPassword };
    console.log(hashedPassword);
    console.log(secureData);
    mySqlConnection.query(`INSERT IGNORE INTO car_register.user SET ?;`, secureData, function (error, results) {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST - Create a new user.
router.post('/login', function (req, res) {
  try {
    mySqlConnection.query(`SELECT * FROM car_register.user WHERE username=?;`, req.body.username, async function (error, result) {
      if (error) throw error;
      if (await bcrypt.compare(req.body.password, result[0].password)) {
        const accessToken = await authUtil.generateAccessToken({ username: req.body.username, password: req.body.password });
        //const refreshToken = await authUtil.generateRefreshToken({ username: req.body.username, password: req.body.password });
        //res.json({ authenticated: true, accessToken: accessToken, refreshToken: refreshToken });
        res.json({ authenticated: true, accessToken: accessToken });
      } else {
        res.json({ authenticated: false });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST - Create a new user.
router.post('/authenticate', async function (req, res) {
  try {
    console.log(await authUtil.authenticateToken({ username: req.body.accessToken }));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
