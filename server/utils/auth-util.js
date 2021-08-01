require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(loginData) {
    try {
        return jwt.sign(loginData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    } catch (error) {
        console.log(error);
    }
}

function generateRefreshToken(loginData) {
    try {
        return jwt.sign(loginData, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.log(error);
    }
}

function authenticateToken(accessToken) {
    try {
        const tokenData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (tokenData) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.authenticateToken = authenticateToken;