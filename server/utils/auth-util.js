require('dotenv').config();
const jwt = require('jsonwebtoken');

async function generateAccessToken(loginData) {
    return jwt.sign(loginData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

async function generateRefreshToken(loginData) {
    return jwt.sign(loginData, process.env.REFRESH_TOKEN_SECRET);
}

async function authenticateToken(accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send(verifiedJwt)
        }
    });
    /*if (!accessToken) {
        return false;
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return false;
        }
        return true;
    });*/
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.authenticateToken = authenticateToken;