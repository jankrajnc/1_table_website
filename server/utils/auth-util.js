require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require("../utils/log-util").getLogger();

// Generates the access token with the login data (username and password) and the secret, that's stored as an environmental variable.
// Expiration time is set to 1 hour.
function generateAccessToken(loginData) {
    try {
        return jwt.sign(loginData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    } catch (error) {
        logger.error(JSON.stringify(error));
        return null;
    }
}

// Similar to the access token, but it has it's own environmental variable and no expiration time. Not used in this application.
function generateRefreshToken(loginData) {
    try {
        return jwt.sign(loginData, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        logger.error(JSON.stringify(error));
        return null;
    }
}

// Authenticates the access token and retuns the result as a boolean.
function authenticateToken(accessToken) {
    try {
        const tokenData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (tokenData) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        logger.error(JSON.stringify(error));
        return false;
    }
}

// The functions are exported individually for a better usage in other modules (in my opinion).
/*module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.authenticateToken = authenticateToken;*/
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken
}