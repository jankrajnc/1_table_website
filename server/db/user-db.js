const mysql = require('mysql');
const bcrypt = require('bcrypt');
const authUtil = require('../utils/auth-util');
const logger = require("../utils/log-util").getLogger();

const mySqlPool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'car_register'
});

// Creates a new user.
async function signupUser(req, res) {
    try {
        // The password is hashed on the server, this means that the sending of data from the client is unsafe.
        // Generally SSL/TLS should be used for a secure connection, but I won't add it for this sample project.
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const secureData = { username: req.body.username, password: hashedPassword };
        mySqlPool.query(`INSERT IGNORE INTO car_register.user SET ?;`, secureData, function (error, results) {
            if (error) {
                logger.error(JSON.stringify(error));
                return res.status(400).send(error);
            }
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Logs the user in based on the password comparison between provided (req.body) data and received data from the server (SELECT statement).
// If the user is authenticated, then an access token is generated for authorization purposes of the application.
async function loginUser(req, res) {
    try {
        mySqlPool.query(`SELECT * FROM car_register.user WHERE username=?;`, req.body.username, async function (error, result) {
            if (error || result.length == 0) {
                logger.error(JSON.stringify(error));
                return res.status(400).send(error);
            }
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
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Authorizes the user, based on his access token, and returns the boolean result as an object.
async function authorizeUser(req, res) {
    try {
        const authenticationStatus = await authUtil.authenticateToken(req.body.accessToken);
        res.json({ authorized: authenticationStatus });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

// Delete a user based on the provided ID.
function deleteUser(req, res) {
    try {
        mySqlPool.query(`DELETE FROM car_register.user WHERE id=?;`, [req.params.id], function (error, results) {
            if (error) res.status(400).json(error);
            res.json(results);
        });
    } catch (error) {
        logger.error(JSON.stringify(error));
        res.status(500).json(error);
    }
}

module.exports = {
    signupUser,
    loginUser,
    authorizeUser,
    deleteUser
}