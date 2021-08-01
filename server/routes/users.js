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
        const accessToken = await authUtil.generateAccessToken({ username: req.body.username, password: result[0].password });

        // While refresh tokens are a vital part of authentication and authorization, I didn't go deeper into them in this application,
        // because they're easy to understand, but take a good chunk of time to implement properly, which would be wasted here in my opinion.
        //const refreshToken = await authUtil.generateRefreshToken({ username: req.body.username, password: result[0].password });
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
router.post('/authorize', async function (req, res) {
  try {
    const authenticationStatus = await authUtil.authenticateToken(req.body.accessToken);
    res.json({ authorized: authenticationStatus });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
