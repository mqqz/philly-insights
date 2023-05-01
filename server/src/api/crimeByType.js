const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS QUERY 5

router.get('/', (req, res) => {
  // modified query slightly to include violent crimes
  let isViolent = req.query.isViolent == "true" ?? false;
  let violentCrimes = ["\'Robbery Firearm\'", "\'Robbery No Firearm\'",
    "\'Homicide - Criminal\'",
    "\'Aggravated Assault No Firearm\'", "\'Aggravated Assault Firearm\'"];
  let nonViolentCrimes = ["\'Thefts\'", "\'Embezzlement\'", "\'Fraud\'",
    "\'Vandalism\'", "\'DRIVING UNDER THE INFLUENCE\'"];
  
  const query = `SELECT text_general_code AS crime_type, COUNT(*) AS crime_count
  FROM Incidents
  WHERE text_general_code IN (${isViolent ? violentCrimes : nonViolentCrimes})
  GROUP BY text_general_code
  `;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (err2, rows) => {
      connection.release(); // return the connection to pool
      if (err2) throw err2;
      res.send(rows);
    });
  });
});

module.exports = router;