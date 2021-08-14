const mysql = require('mysql');
const bcrypt = require('bcrypt');
const authUtil = require('../utils/auth-util');

const mySqlPool = mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'car_register'
});

// Creates a new user.
async function signupUser(req, res) {
    // The password is hashed on the server, this means that the sending of data from the client is unsafe.
    // Generally SSL/TLS should be used for a secure connection, but I won't add it for this sample project.
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const secureData = { username: req.body.username, password: hashedPassword };
    mySqlPool.query(`INSERT IGNORE INTO car_register.user SET ?;`, secureData, function (error, results) {
        if (error) return res.status(400).send("Invalid POST data /signup");
        res.json(results);
    });
}

// Logs the user in based on the password comparison between provided (req.body) data and received data from the server (SELECT statement).
// If the user is authenticated, then an access token is generated for authorization purposes of the application.
async function loginUser(req, res) {
    mySqlPool.query(`SELECT * FROM car_register.user WHERE username=?;`, req.body.username, async function (error, result) {
        if (error || result.length == 0) return res.status(400).send("Invalid POST data /login");
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
}

// Authorizes the user, based on his access token, and returns the boolean result as an object.
async function authorizeUser(req, res) {
    const authenticationStatus = await authUtil.authenticateToken(req.body.accessToken);
    res.json({ authorized: authenticationStatus });
}

// Delete a user based on the provided ID.
function deleteUser(req, res) {
    mySqlPool.query(`DELETE FROM car_register.user WHERE id=?;`, [req.params.id], function (error, results) {
        if (error) throw error;
        res.json(results);
    });
}

module.exports = {
    signupUser,
    loginUser,
    authorizeUser,
    deleteUser
}