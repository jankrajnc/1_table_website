/* This structure has only one location where the application connects to the database.
   So if we ever want to improve our query handling with some logging, 
   we don't need to change multiple locations, just this one.
*/

// MySQL library.
const mysql = require('mysql');

// Database connection object.
const mySqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'car_register'
});

// Query to be fed from other files (routes).
function connectToDatabase(query, params) {
  try {
    mySqlConnection.query(query, params, function (error, results) {
      if (error) {
        throw error;
      }
      //res.json(results);
    });
  } catch (error) {
    //res.status(500).json(error);
  }
}

module.exports.connectToDatabase = connectToDatabase;